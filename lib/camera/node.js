'use strict';

var Ose = require('ose');
var M = Ose.module(module);

//var Net = require('net');
var Process = require('child_process');
var Fs = require('fs');
/*var Exec = require('child_process').exec;*/
//var Transcoder = require('stream-transcoder');
var Raspicam = require('raspicam');

// Public {{{1
exports.init = function() {  // {{{2
  this.on('still', still);

//  Content.addHandler(entry.id + '.mp4', onVideo.bind(entry));
//  Content.addHandler(entry.id + '.mjpg', onMjpg.bind(entry));
};

// }}}1
// Private {{{1
function still(that, action, cb) {  // {{2
/* TODO rewrite to links
 */

  var timestamp = new Date().getTime();
  var file = 'raspistill_' + timestamp + '.png'
  var path = 'rpi/captures/';

  var camera = new Raspicam({
    mode: 'photo',
    e: 'png',
    vf: true,
    hf: true,
    output: path + file
  });

  camera.on('started', M.log.bind('notice', 'RASPICAM STARTED'));
  camera.on('exited', M.log.bind('notice', 'RASPICAM EXITED'));

  camera.on('read', function onStill(err, timestamp, filename) {
//    console.log('CAMERA READ', arguments);

    if (filename === file) {
      cb && cb(null, {uri: Ose.http.getUrl() + '/ose-' + path + file});
      cb = null;
//      this.setState({lastStill: Ose.http.getUrl() + '/ose-' + path + file});
    }
  });

  camera.on('error', function(err) {
    console.log('CAMERA ERROR', arguments);
    cb && cb(err);
    cb = null;
  });

  camera.start();
};

function onVideo(req, resp, params) {  // {{{2
  var that = this;

  console.log('REQUEST', req.method, req.headers);

  resp.writeHead(200, {'Content-type': 'video/mp4'});

  if (req.method !== 'GET') {
    return;
  }

  readCam(this, function(err, stream) {
    if (err) {
      M.log.unhandled('READ CAMERA ERROR', err);
      return;
    }

    console.log('STREAMING ....');
    stream.pipe(resp);

    /*

    new Transcoder(stream)
//      .maxSize(320, 240)
      .videoCodec('h264')
      .videoBitrate(800 * 1000)
      .fps(25)
//      .audioCodec('libfaac')
//      .sampleRate(44100)
//      .channels(2)
//      .audioBitrate(128 * 1000)
      .format('mp4')
      .on('error', M.log.bind('error', 'Transcoder error'))
      .on('finish', function() {
        console.log('TRANSCODER FINISHED', arguments);
//          next();
      })
      .stream().pipe(resp)
    ;

    resp.on('close', function() {
      console.log('RESPONSE CLOSED');
      stream.unpipe(resp);
      resp.end();

      that.camPs && that.camPs.kill();
    });
*/
    return;
  });

  return;
}

function onMjpg(req, resp, params) {  // {{{2
  resp.writeHead(200, {'Content-type': 'multipart/x-mixed-replace'/*'image/jpg'*/});

  if (req.method !== 'GET') {
    return;
  }

  readCam(this, function(err, stream) {
    if (err) {
      M.log.unhandled('READ CAMERA ERROR', err);
      return;
    }

    stream.pipe(resp);

    return;
  })

  return;
};

function readCam1(that, cb) {  // {{{2
//  var file = Fs.open('/tmp/gaga.mp4', 'r');
  var file = Fs.createReadStream('/tmp/gaga.mp4');
  cb(null, file);
};

function readCam(that, cb) {  // {{{2
  if (! that.camPs) {
    var args = [
      '--timeout', 15000,
      '--width', 320,
      '--height', 240,
      '--bitrate', 800 * 1000,
      '--framerate', 25,
      '--vflip',
//      '-o', '/tmp/fifo.h264',
      '-o', '-'
    ];

    console.log('SPAWNING raspivid', args.join(' '));
    that.camPs = Process.spawn('raspivid', args);

    that.camPs.stderr.setEncoding('utf8');
    that.camPs.stderr.on('data', function() {
      console.log('STDERR raspivid', arguments);
    });

    that.camPs.on('exit', function() {
      console.log('... raspivid DONE')
      delete that.camPs;
    });

    args = [  // MP4
      'y',
      '-i', '/tmp/fifo.h264',
      '-vcodec', 'copy',
      '-an',
      '-f', 'mp4'
      //Output
    ];

    args = [  // MPEG-TS
      '-i', 'pipe:0',
      '-vcodec', 'copy',
      '-f', 'mpegts',
      'pipe:1'
    ];

    args = [  // MJPG
      '-i', 'pipe:0',
//      '-vcodec', 'copy',
      '-qscale', '1',
      '-f', 'mjpeg',
      'pipe:1'
    ];

    console.log('SPAWNING ffmpeg', args.join(' '));
    that.ffPs = Process.spawn(
      'ffmpeg',
      args,
      {
        env: {
          LD_LIBRARY_PATH: '/usr/local/lib'
        }
      }
    );

    that.ffPs.stderr.setEncoding('utf8');
    that.ffPs.stderr.on('data', function() {
      console.log('STDERR ffmpeg', arguments);
    });

    that.ffPs.on('exit', function() {
      console.log('... ffmpeg DONE')
      delete that.ffPs;
    });

    that.camPs.stdout.pipe(that.ffPs.stdin);

    cb(null, that.ffPs.stdout);
  } else {
    cb(null, that.camPs.stdout);
  }
};

function readCam2(that, cb) {  // {{{2
  if (! that.camPs) {
    var args = [
      '--timeout', 15000,
      '--width', 320,
      '--height', 240,
      '--bitrate', 800 * 1000,
      '--framerate', 25,
      '-o', '/tmp/fifo.h264',
  //    '-o -',
    ];

    console.log('SPAWNING raspivid', args.join(' '));
    that.camPs = Process.spawn('raspivid', args);

    that.camPs.stderr.setEncoding('utf8');
    that.camPs.stderr.on('data', function() {
      console.log('STDERR', arguments);
    });

    that.camPs.on('exit', function() {
      console.log('... raspivid DONE')
      delete that.camPs;
    });

    setTimeout(function() {
      args = [  // MP4
        '-i', '/tmp/fifo.h264',
        '-vcodec', 'copy',
        '-an',
        '-f', 'mp4',
        'pipe:1'
      ];

      args = [  // MPEG-TS
        '-i', '/tmp/fifo.h264',
        '-vcodec', 'copy',
        '-f', 'mpegts',
        'pipe:1'
      ];

      console.log('SPAWNING ffmpeg', args.join(' '));
      that.ffPs = Process.spawn(
        'ffmpeg',
        args,
        {
          env: {
            LD_LIBRARY_PATH: '/usr/local/lib'
          }
        }
      );

      that.ffPs.stderr.setEncoding('utf8');
      that.ffPs.stderr.on('data', function() {
        console.log('STDERR', arguments);
      });

      that.ffPs.on('exit', function() {
        console.log('... ffmpeg DONE')
        delete that.ffPs;
      });

      cb(null, that.ffPs.stdout);
    }, 5000);
  } else {
    cb(null, that.camPs.stdout);
  }
};

/* COMMENTS {{{1
/*
  if (this.camServer) {
    if (this.camSocket) {
      this.camSocket.pipe(resp);
    } else {
//      startCam();
    }
  } else {
    this.camServer = Net.createServer(function(socket) {
      console.log('CONNECTED SOCKET');

      that.camSocket = socket;
      socket.pipe(resp);
    });

    this.camServer.listen('/tmp/raspicam', function() {
      console.log('LISTENING ON /tmp/raspicam');

//      startCam();
    });
  }

  function startCam() {
    console.log('######## video ########');

    var camera = new Raspicam({
      mode: 'video',
      output: '/tmp/raspicam'
    });

    camera.start();

    camera.on('started', onStarted);

    camera.on('read', onRead);

    camera.on('exited', onExited);
  }


  function onStarted() {
    console.log('******** Started ********\n', arguments);
  }

  function onRead() {
    console.log('******** Read ********\n', arguments);
  }

  function onExited() {
    console.log('******** Exited ********\n', arguments);
  }
};
}}}1 */

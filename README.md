# Open Smart Environment Raspberry Pi package

This package contains [entry kinds](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) for integrating hardware from
the Raspberry Pi Foundation into OSE.

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Gaps in the documentation
- No test suite

This is not yet a piece of download-and-use software. Its important
to understand the basic principles covered by this documentation.

Use of this software is currently recommended only for users that
wish participate in the development process, see
[Contributions](#contributions).

## Getting started
To get started with OSE, refer to the [ose-bundle](http://opensmartenvironment.github.io/doc/modules/bundle.html) package and
[Media player example application](http://opensmartenvironment.github.io/doc/modules/bundle.media.html). You can read the entire OSE
documentation [here]( http://opensmartenvironment.github.io/doc).

## Modules
Open Smart Environment Raspberry Pi package consists of the following modules:
- Raspberry PI camera kind
- Raspberry PI kind
- OSE Raspberry core
- OSE Raspberry content

### Raspberry PI camera kind
[Entry kind](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) describing Raspberry PI cameras. It uses the raspicam
npm package to take pictures.

Module [Raspberry PI camera kind](http://opensmartenvironment.github.io/doc/classes/rpi.lib.camera.html) reference ... 

### Raspberry PI kind
[Entry kind](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) describing Raspberry PI boards. It is possible to
control GPIO pins using the [Pins](http://opensmartenvironment.github.io/doc/modules/control.pin.html) class.

Module [Raspberry PI kind](http://opensmartenvironment.github.io/doc/classes/rpi.lib.rpi.html) reference ... 

### OSE Raspberry core
Core singleton of ose-rpi npm package. Registers [entry kinds](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html)
defined by this package to the `"control"` [scope](http://opensmartenvironment.github.io/doc/classes/ose.lib.scope.html).

Module [OSE Raspberry core](http://opensmartenvironment.github.io/doc/classes/rpi.lib.html) reference ... 

### OSE Raspberry content
Provides files of OSE Raspberry package to the browser.

Module [OSE Raspberry content](http://opensmartenvironment.github.io/doc/classes/rpi.content.html) reference ... 

## <a name="contributions"></a>Contributions
To get started contributing or coding, it is good to read about the
two main npm packages [ose](http://opensmartenvironment.github.io/doc/modules/ose.html) and [ose-bb](http://opensmartenvironment.github.io/doc/modules/bb.html).

This software is in the pre-alpha stage. At the moment, it is
premature to file bugs. Input is, however, much welcome in the form
of ideas, comments and general suggestions.  Feel free to contact
us via
[github.com/opensmartenvironment](https://github.com/opensmartenvironment).

## Licence
This software is released under the terms of the [GNU General
Public License v3.0](http://www.gnu.org/copyleft/gpl.html) or
later.

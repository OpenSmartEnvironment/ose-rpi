# Open Smart Environment Raspberry package

This package contains [entry kinds] for integrating hardware from
the Raspberry Pi Foundation into OSE.

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Gaps in the documentation
- No test suite

This is not yet a piece of download-and-use software. Its important
to understand the basic principles covered by this documentation.

Use of this software is currently recommended only for users that
wish participate in the development process (see Contributions).

TODO: Make contribution a link

## Getting started
To get started with OSE, refer to the [ose-bundle] package and
[Media player example application].

## Modules
Open Smart Environment Raspberry package consists of the following modules:
- Raspberry PI camera kind
- Raspberry PI kind
- OSE Raspberry core
- OSE Raspberry content

### Raspberry PI camera kind
[Entry kind] describing Raspberry PI cameras. It uses the raspicam
npm package to take pictures.

Module [Raspberry PI camera kind] reference ... 

### Raspberry PI kind
[Entry kind] describing Raspberry PI boards. It is possible to
control GPIO pins using the [Pins] class.

Module [Raspberry PI kind] reference ... 

### OSE Raspberry core
Core singleton of ose-rpi npm package. Registers [entry kinds]
defined by this package to the `"control"` [scope].

Module [OSE Raspberry core] reference ... 

### OSE Raspberry content
Provides files of OSE Raspberry package to the browser.

Module [OSE Raspberry content] reference ... 

## Contributions
To get started contributing or coding, it is good to read about the
two main npm packages [ose] and [ose-bb].

This software is in the pre-alpha stage. At the moment, it is
premature to file bugs. Input is, however, much welcome in the form
of ideas, comments and general suggestions.  Feel free to contact
us via
[github.com/opensmartenvironment](https://github.com/opensmartenvironment).

## License
This software is licensed under the terms of the [GNU GPL version
3](../LICENCE) or later

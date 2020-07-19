# compare-files

[![Maintainability](https://api.codeclimate.com/v1/badges/10643b4e8cab7c753520/maintainability)](https://codeclimate.com/github/alexrunfire/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/10643b4e8cab7c753520/test_coverage)](https://codeclimate.com/github/alexrunfire/frontend-project-lvl2/test_coverage)
[![Node.js CI](https://github.com/alexrunfire/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/alexrunfire/frontend-project-lvl2/actions)

This command line tool finds the difference between two files with .json, .yml, .ini extensions showing result in different types: object, plain, JSON.

## Project Status
Project completed

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Setup

```sh
$ npm install
```

## Find the difference between two files (.json , .yml , .ini) in different types

### Object type

```sh
$ gendiff <...path/before.format> <...path/after.format>
```

[![asciicast](https://asciinema.org/a/GmQCS2mD1jnEpTKnspR2Vks5P.svg)](https://asciinema.org/a/GmQCS2mD1jnEpTKnspR2Vks5P)

### Plain type

```sh
$ gendiff --format plain <...path/before.format> <...path/after.format>
```

[![asciicast](https://asciinema.org/a/F3irw437AbZ93tmU2sJZmeADF.svg)](https://asciinema.org/a/F3irw437AbZ93tmU2sJZmeADF)

### JSON type

```sh
$ gendiff --format JSON <...path/before.format> <...path/after.format>
```

[![asciicast](https://asciinema.org/a/hfiR9z5o0z2OWFFi6yZmhHLc6.svg)](https://asciinema.org/a/hfiR9z5o0z2OWFFi6yZmhHLc6)

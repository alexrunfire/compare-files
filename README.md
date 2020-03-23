# frontend-project-lvl2

[![Maintainability](https://api.codeclimate.com/v1/badges/10643b4e8cab7c753520/maintainability)](https://codeclimate.com/github/alexrunfire/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/10643b4e8cab7c753520/test_coverage)](https://codeclimate.com/github/alexrunfire/frontend-project-lvl2/test_coverage)
[![Node.js CI](https://github.com/alexrunfire/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/alexrunfire/frontend-project-lvl2/actions)

This command line utility finds the difference between two files with .json, .yml, .ini extensions.

## Setup

```sh
$ npm install
```

## Find difference between two plain files

### .json

```sh
$ gendiff <...path/before.json> <...path/after.json>
```
[![asciicast](https://asciinema.org/a/Ukz3urFnprwKp4rJPBe6nqBS4.svg)](https://asciinema.org/a/Ukz3urFnprwKp4rJPBe6nqBS4)

### .yml

```sh
$ gendiff <...path/before.yml> <...path/after.yml>
```
[![asciicast](https://asciinema.org/a/k9SjIyBeVJw2UjkCT2PpwjvyV.svg)](https://asciinema.org/a/k9SjIyBeVJw2UjkCT2PpwjvyV)

### .ini

```sh
$ gendiff <...path/before.ini> <...path/after.ini>
```
[![asciicast](https://asciinema.org/a/Ki9cIwZlbtIZOru8QiErOJgCh.svg)](https://asciinema.org/a/Ki9cIwZlbtIZOru8QiErOJgCh)

## Find difference between two files in default format(.json , .yml , .ini)

```sh
$ gendiff <...path/before.format> <...path/after.format>
```

[![asciicast](https://asciinema.org/a/GmQCS2mD1jnEpTKnspR2Vks5P.svg)](https://asciinema.org/a/GmQCS2mD1jnEpTKnspR2Vks5P)

## Find difference between two files in plain format(.json , .yml , .ini)

```sh
$ gendiff --format plain <...path/before.format> <...path/after.format>
```

[![asciicast](https://asciinema.org/a/F3irw437AbZ93tmU2sJZmeADF.svg)](https://asciinema.org/a/F3irw437AbZ93tmU2sJZmeADF)

## Find difference between two files in JSON format(.json , .yml , .ini)

```sh
$ gendiff --format JSON <...path/before.format> <...path/after.format>
```

[![asciicast](https://asciinema.org/a/hfiR9z5o0z2OWFFi6yZmhHLc6.svg)](https://asciinema.org/a/hfiR9z5o0z2OWFFi6yZmhHLc6)
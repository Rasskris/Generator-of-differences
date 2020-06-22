[![Maintainability](https://api.codeclimate.com/v1/badges/d92b80aff1f0f39c8f38/maintainability)](https://codeclimate.com/github/Rasskris/frontend-project-lvl2/maintainability)
[![Node CI](https://github.com/Rasskris/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Rasskris/frontend-project-lvl2/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d92b80aff1f0f39c8f38/test_coverage)](https://codeclimate.com/github/Rasskris/frontend-project-lvl2/test_coverage)
------------
# Generator of differences
## Utility for finding differences in configuration files
The utility compares two configuration files and displays the result of the comparison in the console.

Supported formats: `json`, `yaml`, `ini`. 

Supports output in several formats: `stylish`, `plain` and `json`.

### Installation:
```sh
$ npm install gendiff-utility
```
### Use:
```sh
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output usage information
  -f, --format [type]  output format
  -h, --help           display help for command
```

### Output `stylish` format (stylish default format):
```sh
$ gendiff --format stylish <file1> <file2>
```
[![asciicast](https://asciinema.org/a/341883.svg)](https://asciinema.org/a/341883)
### Output `plain` format:
```sh
$ gendiff --format plain <file1> <file2>
```
[![asciicast](https://asciinema.org/a/341884.svg)](https://asciinema.org/a/341884)
### Output `json` format:
```sh
$ gendiff --format json <file1> <file2>
```
[![asciicast](https://asciinema.org/a/341886.svg)](https://asciinema.org/a/341886)
# Similar Homes Photo Carousel 

Display 12 nearby homes a on a photo carousel, with general location, short description of locale, price and rating. 

## Related Projects

  - https://github.com/abode-ly/carousel_module
  - https://github.com/abode-ly/checkout_module
  - https://github.com/abode-ly/reviews_module
  - https://github.com/abode-ly/host_info

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
  Allows user to browse through 12 near by homes on a photo carousel. 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

# CRUD API
  ### 1. Get similar homes for the accommodation selected - (READ)
  The components can retrieve and suggest similiar homes from the database for the selected accommodation

  ```sh
  GET - /bookings/:accommodationid/similar_homes
  ```

  - *There is no create, update, or delete API for this component*

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


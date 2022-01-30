# Simple clicker app

# Installation

Make sure you have a JavaScript runtime such as node installed.

## Prerequisites

Install ruby version 3.1.0.

Install the correct version of bundler with `gem install bundler:2.3.3`

Run `bundle install` to install all dependencies specified in the Gemfile

## For development version

Run migrations with `rails db:migrate`

Run `rails s` to start the project in development mode

## For production version

Run migrations with `rails db:migrate RAILS_ENV=production`

Precompile your assets with `rake assets:precompile`

Run `rails s -e production` to start the project in production mode

(To get error output use `RAILS_LOG_TO_STDOUT=true rails s -e production`)

### The application by default runs in port 3000

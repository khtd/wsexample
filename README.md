## Install dependences
```
$ npm install

```
# WebSocket example

## Run server with actual payload
```

$ node start --now

```

# Run server with future payload
```

$ node start --future

```

and open browser http://localhost:4200/


# Longpolling example

``` 
$ cd wilton_longpolling

```

In ```config.json``` change ```type``` to ```now``` or ```future``` for actual or future payload.

```
$ wilton index.js

```
and open browser http://localhost:8080/

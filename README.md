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

# Longpolling example

``` 
$ cd wilton_longpolling

```

Дальше в файле ```config.json``` в поле ```type``` записать ```now``` или ```future``` для актуальной или прогнозируемой нагрузки.

```
$ wilton index.js

```


and open browser http://localhost:4200/

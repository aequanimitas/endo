#!/usr/bin/env bats

@test "Called with no arguments" {
        run node index.js
        [ "${lines[0]}" = "Endo v0.0.1" ]
        [ "${lines[1]}" = "Usage:" ]
        [ "${lines[2]}" = '    -i, --item    Item name' ]
        [ "${lines[3]}" = '    -e, --expiry  Expiration Date' ]
}

@test "Called --item with no value given" {
        run node index.js --item
        [ "${lines[0]}" = "Endo v0.0.1" ]
        [ "${lines[1]}" = '-i, --item argument has no value' ]
}

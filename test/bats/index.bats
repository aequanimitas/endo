#!/usr/bin/env bats

@test "Called with no arguments" {
        run node index.js
        [ "${lines[0]}" = "Endo v0.0.1" ]
        [ "${lines[1]}" = "Usage:" ]
}

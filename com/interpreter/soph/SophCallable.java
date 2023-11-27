package com.interpreter.soph;

import java.util.List;

interface SophCallable {
    int arity();
    Object call(Interpreter interpreter, List<Object> arguments);
}

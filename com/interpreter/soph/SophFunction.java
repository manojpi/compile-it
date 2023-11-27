package com.interpreter.soph;

import java.util.List;

class SophFunction implements SophCallable {
    private final Stmt.Function declaration;
    private final Environment closure;
    private final boolean isInitializer;

    SophFunction(Stmt.Function declaration, Environment closure, boolean isInitializer) {
        this.isInitializer = isInitializer;
        this.closure = closure;
        this.declaration = declaration;
    }

    SophFunction bind(SophInstance instance) {
        Environment environment = new Environment(closure);
        environment.define("this", instance);
        return new SophFunction(declaration, environment, isInitializer);
    }

    @Override
    public String toString() {
        return "<fn " + declaration.name.lexeme + ">";
    }

    @Override
    public int arity() {
        return declaration.parameters.size();
    }

    @Override
    public Object call(Interpreter interpreter, List<Object> arguments) {
        Environment environment = new Environment(closure);
        for (int i = 0; i < declaration.parameters.size(); i++) {
            environment.define(declaration.parameters.get(i).lexeme, arguments.get(i));
        }

        try {
            interpreter.executeBlock(declaration.body, environment);
        } catch (Return returnValue) {
            return returnValue.value;
        }

        if (isInitializer) return closure.getAt(0, "this");
        return null;
    }
}

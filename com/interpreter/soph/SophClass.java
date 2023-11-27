package com.interpreter.soph;

import java.util.List;
import java.util.Map;

class SophClass implements SophCallable {
    final String name;
    final SophClass superclass;
    private final Map<String, SophFunction> methods;

    SophClass(String name, SophClass superclass, Map<String, SophFunction> methods) {
        this.name = name;
        this.superclass = superclass;
        this.methods = methods;
    }

    SophFunction findMethod(SophInstance instance, String name) {
        if (methods.containsKey(name)) {
            return methods.get(name).bind(instance);
        }

        if (superclass != null) {
            return superclass.findMethod(instance, name);
        }

        return null;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public Object call(Interpreter interpreter, List<Object> arguments) {
        SophInstance instance = new SophInstance(this);

        SophFunction initializer = methods.get("init");
        if (initializer != null) {
            initializer.bind(instance).call(interpreter, arguments);
        }

        return instance;
    }

    @Override
    public int arity() {
        SophFunction initializer = methods.get("init");
        if (initializer == null) return 0;
        return initializer.arity();
    }
}

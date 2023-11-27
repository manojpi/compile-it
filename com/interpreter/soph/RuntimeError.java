package com.interpreter.soph;

class RuntimeError extends RuntimeException {
    final Token token;

    RuntimeError(Token token, String message) {
        super(message);
        this.token = token;
    }
}

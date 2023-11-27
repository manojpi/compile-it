soph: build
    java -cp bin/soph com.interpreter.soph.Soph

generate_ast: build_tool
    java -cp bin/soph com.interpreter.tool.GenerateAst com/interpreter/soph

build: bin generate_ast
    javac -d bin/soph com/interpreter/soph/*.java

build_tool: bin
    javac -d bin/soph com/interpreter/tool/*.java

clean:
    @rm -rf bin

bin:
    @mkdir -p bin/soph
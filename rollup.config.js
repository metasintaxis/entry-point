import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace";

export default {
    input: "src/client/main.js",

    output: {
        file: "src/client/dist/index.js",
        format: "umd",
    },

    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
	    preventAssignment: true
        }),
        lwc(),
    ],
};


## Iniciamos typescript

```bash
tsc --init
```

En el archivo de configuración generado tsconfig.json, modificamos:
```json
{
  "compilerOptions": {
    ...
    "rootDir": "./src",
    ...
    "outDir": "./dist",
    "removeComments": true,
    ...
    "noEmitOnError": false,
  }
}
```
Descripción:
> - **"rootDir"**: Es el directorio donde se encuentran los archivos fuente de TypeScript.
> - **"outDir"**: Es el directorio donde se generarán los archivos JavaScript compilados.
> - **"removeComments"**: Elimina los comentarios en el código JavaScript generado.
> - **"noEmitOnError"**: Si se establece en `false`, permite la generación de archivos JavaScript incluso si hay errores de compilación.
## Requisitos
- NodeJS v16.14.0
## Instalación
1. Clona el repositorio
2. `npm install` en la carpeta del repo
## Correr el proyecto
`npm run dev`
## Estructura de los archivos
- En `src` está todo el código fuente.
- Los archivos `main.ts`, `files.d.ts`, y `vite-env.d.ts` *no* los vamos a tocar
- `scenes` contiene las "escenas" (como las escenas de Unity) del juego
- `actors` contiene a los objetos activos del juego (como los GameObjects de Unity)
- `objects` contendrá los objetos y estructuras primarios que vayamos a necesitar (grafos y demás)
- `res` tendrá todos los recursos del juego. Dentro hay una carpeta `images`, ahí pondremos las imágenes. Si necesitamos sonidos, haremos una carpeta `sounds` dentro de `res`
- En el archivo `resources.ts` vamos a colocar los recursos gráficos (imágenes) del juego dentro del objeto Images, así:
```typescript
import imagen from './res/images/mi_imagen.png';

let Images: {[name: string]: ImageSource} = {
    ...,
    NombreUpperCamelCase: new ImageSource(imagen),
    ...
};
```
- Por último, en el archivo `scenes.ts` vamos a colocar las escenas que vayamos usando en el juego, así:
```typescript
import { MiEscena } from "./scenes/miEscena";

let Scenes: {[name: string]: Scene} = {
    nombreGlobalDeMiEscena: new MiEscena()
};
```
  **NOTA:** `nombreGlobalDeMiEscena` es el nombre que tendremos que usar para referirnos a esa escena cuando vayamos a usarla.
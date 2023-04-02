import path from 'path';

import { defineConfig} from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'

const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: './views/pages/index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: 'Piano3D',
          pianoElmt: '<div class="cadre">    <!-- Le piano en 3D -->    <div id="piano3D">        <!-- Boucles pour créer les octaves -->        <% for (let nb = 0; nb < 3; nb++){ %>            <!-- Un octave -->            <div class="octave" id="octave<%=nb%>">                <!-- La vue de dessus du piano -->                <div class="top-view">                    <canvas class="background"></canvas>                    <div class="white-keys">                        <canvas class="C" data-key="C"></canvas>                        <canvas class="D" data-key="D"></canvas>                        <canvas class="E" data-key="E"></canvas>                        <canvas class="F" data-key="F"></canvas>                        <canvas class="G" data-key="G"></canvas>                        <canvas class="A" data-key="A"></canvas>                        <canvas class="B" data-key="B"></canvas>                    </div>                    <div class="black-keys">                        <div class="left-part">                              <div class="keys">                                <canvas class="Db" data-key="C#"></canvas>                                <canvas class="Eb" data-key="D#"></canvas>                            </div>                        </div>                        <div class="right-part">                            <div class="keys">                                <canvas class="Gb" data-key="F#"></canvas>                                <canvas class="Ab" data-key="G#"></canvas>                                <canvas class="Bb" data-key="A#"></canvas>                            </div>                        </div>                    </div>                </div>                <!-- La vue de devant du piano -->                <div class="front-view">                    <canvas class="background"></canvas>                    <div class="white-keys">                            <canvas class="C"></canvas>                            <canvas class="D"></canvas>                            <canvas class="E"></canvas>                            <canvas class="F"></canvas>                            <canvas class="G"></canvas>                            <canvas class="A"></canvas>                            <canvas class="B"></canvas>                    </div>                </div>            </div>        <% } %>    </div></div>',
          dir: __dirname
        },
      },
    }),
  ],
})
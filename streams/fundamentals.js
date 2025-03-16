// Nodejs Streams = permite ler pequenos trechos/partes de grandes arquivos e já conseguir trabalhar com esses dados mesmo que eles ainda não estejam totalmente carregados.

// Readable Streams / Writable Streams

// Exemplo: Netflix & Spotify > *Writable Streams* enviando uma informação aos poucos para o front-end

// Exemplo: importação de clientes via CSV (Excel) > *Readable Streams*  o sistema lê aos poucos um arquivo enviado para o backend

// Streams ->

// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());

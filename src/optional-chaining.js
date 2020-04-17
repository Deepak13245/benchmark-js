import Benchmark from "benchmark";
import {get} from 'lodash';

const obj = {
  a: {
    b: {
      c: {
        d: {
          e: {
            f: 'hello'
          }
        }
      }
    },
  },
};

const suite1 = new Benchmark.Suite("Optional chaining & nullish correct path", {
  setup: () => {
  }
});

suite1.add('lodash', () => {
  const x = get(obj, 'a.b.c.d.e.f', 'hello');
});

suite1.add('babel', () => {
  const x = obj.a?.b?.c?.d?.e?.f ?? 'hello';
});

const suite2 = new Benchmark.Suite("Optional chaining & nullish incorrect path 1 ele", {
  setup: () => {
  }
});

suite2.add('lodash', () => {
  const x = get(obj, 'a.b.c.d.e.f.g', 'hello');
});

suite2.add('babel', () => {
  const x = obj.a?.b?.c?.d?.e?.f?.g ?? 'hello';
});

const suite3 = new Benchmark.Suite("Optional chaining & nullish incorrect path 2 ele", {
  setup: () => {
  }
});

suite3.add('lodash', () => {
  const x = get(obj, 'a.b.c.d.g.h', 'hello');
});

suite3.add('babel', () => {
  const x = obj.a?.b?.c?.d?.g?.h ?? 'hello';
});

const suite4 = new Benchmark.Suite("Optional chaining & nullish incorrect path multi ele", {
  setup: () => {
  }
});

suite4.add('lodash', () => {
  const x = get(obj, 'a.g.c.d.e.f.g', 'hello');
});

suite4.add('babel', () => {
  const x = obj.a?.g?.c?.d?.e?.f?.g ?? 'hello';
});

export default [suite1, suite2, suite3, suite4]

<script lang="ts">
  import { Plot, Line } from 'svelteplot';
  import type { RawValue } from 'svelteplot/types/data.js';

  const data = (() => {
    const points: Record<string, RawValue>[] = [];
    let value = 100;
    let x = 0;

    for (let i = 0; i < 150; i++) {
      const step = (Math.random() - 0.52) * 10;
      value += step;
      value = Math.max(0, value);

      x++;

      points.push({
        x,
        y: value
      });
    }
    return points;
  })();

  // Simulate async data loading
  const loadData = new Promise<Record<string, RawValue>[]>((resolve) => {
    setTimeout(() => resolve(data), 100);
  });
</script>

<div class="wrapper">
  <svelte:boundary>
    {@const data: Record<string, RawValue>[] = await loadData}

    {#if data}
      <article class="content">
        <h1>Reproduction w/ async boundary</h1>
        <section class="graph">
          <Plot grid>
            <Line {data} x="x" y="y" />
          </Plot>
        </section>
      </article>
    {/if}

    {#snippet pending()}
      <p>Loading...</p>
    {/snippet}
  </svelte:boundary>
</div>

<div class="wrapper">
  <article class="content">
    <h1>Reference w/o async boundary</h1>
    <section class="graph">
      <Plot grid>
        <Line {data} x="x" y="y" />
      </Plot>
    </section>
  </article>
</div>

<style>
  .wrapper {
    /* layout */
    padding: 0.5rem 1rem;
    width: 100%;
    height: 100%;
  }

  .content {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
  }
</style>

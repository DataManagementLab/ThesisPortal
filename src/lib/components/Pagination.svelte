<script>
	export let pageCount;
	export let currentIndex;
	export let url;
	export let param = 'page';
	const separator = url.includes('?') ? '&' : '?';
	$: currentIndex = parseInt(currentIndex);
</script>

{#if pageCount > 1}
	<div class="btn-group">
		<a
			href={`${url}${separator}${param}=${currentIndex - 1}`}
			class="btn"
			class:btn-disabled={currentIndex <= 1}>
			Previous
		</a>
		{#if pageCount <= 10}
			{#each Array(pageCount) as _, i}
				<a href={`${url}${separator}${param}=${i + 1}`} class="btn" class:btn-active={i + 1 == currentIndex}>
					{i + 1}
				</a>
			{/each}
		{:else}
			<a href={`${url}${separator}${param}=1`} class="btn" class:btn-active={currentIndex == 1}>1</a>
			{#if currentIndex < 5}
				{#each Array(Math.min(pageCount, 5) - 1) as _, i}
					<a href={`${url}${separator}${param}=${i + 2}`} class="btn" class:btn-active={i + 2 == currentIndex}>
						{i + 2}
					</a>
				{/each}
				<button class="btn-disabled btn">...</button>
			{:else if currentIndex > pageCount - 4}
				<button class="btn-disabled btn">...</button>
				{#each Array(4) as _, i}
					<a
						href={`${url}${separator}${param}=${pageCount - 4 + i}`}
						class="btn"
						class:btn-active={pageCount - 4 + i == currentIndex}>
						{pageCount - 4 + i}
					</a>
				{/each}
			{:else}
				<button class="btn-disabled btn">...</button>
				{#each Array(5) as _, i}
					<a
						href={`${url}${separator}${param}=${currentIndex - 2 + i}`}
						class="btn"
						class:btn-active={currentIndex - 2 + i == currentIndex}>
						{currentIndex - 2 + i}
					</a>
				{/each}
				<button class="btn-disabled btn">...</button>
			{/if}
			<a
				href={`${url}${separator}${param}=${pageCount}`}
				class="btn"
				class:btn-active={pageCount == currentIndex}>
				{pageCount}
			</a>
		{/if}
		<a
			href={`${url}${separator}${param}=${currentIndex + 1}`}
			class="btn"
			class:btn-disabled={currentIndex >= pageCount}>
			Next
		</a>
	</div>
{/if}
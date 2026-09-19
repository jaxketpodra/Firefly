<script lang="ts">
import { onMount } from "svelte";
import Icon from "@/components/common/Icon.svelte";

interface Entry {
	id: string;
	name: string;
	name_zh: string;
	preview: string;
	tags: string;
	tags_zh: string;
	categories: string[];
}

type LibKey = "clothing" | "pose" | "background";

const libs: { key: LibKey; label: string; icon: string }[] = [
	{ key: "clothing", label: "服装", icon: "material-symbols:apparel" },
	{ key: "pose", label: "姿势", icon: "material-symbols:accessibility-new" },
	{ key: "background", label: "背景", icon: "material-symbols:landscape" },
];

let active: LibKey = "clothing";
let data: Record<LibKey, Entry[] | null> = {
	clothing: null,
	pose: null,
	background: null,
};
let loading = false;
let keyword = "";
let category = "";
let page = 1;
const pageSize = 48;
let copiedId = "";

async function loadLib(key: LibKey) {
	if (data[key]) return;
	loading = true;
	try {
		const res = await fetch(`/anima/${key}.json`);
		data[key] = await res.json();
	} catch (e) {
		console.error("图鉴数据加载失败", e);
		data[key] = [];
	}
	loading = false;
}

function switchLib(key: LibKey) {
	active = key;
	category = "";
	page = 1;
	loadLib(key);
}

$: entries = data[active] || [];
$: categories = [...new Set(entries.flatMap((e) => e.categories || []))].sort();
$: filtered = entries.filter((e) => {
	if (category && !(e.categories || []).includes(category)) return false;
	if (!keyword.trim()) return true;
	const k = keyword.trim().toLowerCase();
	return (
		e.name?.toLowerCase().includes(k) ||
		e.name_zh?.toLowerCase().includes(k) ||
		e.tags?.toLowerCase().includes(k) ||
		e.tags_zh?.toLowerCase().includes(k)
	);
});
$: pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
$: if (page > pageCount) page = pageCount;
$: paged = filtered.slice((page - 1) * pageSize, page * pageSize);

async function copyTags(e: Entry) {
	try {
		await navigator.clipboard.writeText(e.tags);
	} catch {
		const ta = document.createElement("textarea");
		ta.value = e.tags;
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy");
		document.body.removeChild(ta);
	}
	copiedId = active + e.id;
	setTimeout(() => (copiedId = ""), 1500);
}

onMount(() => loadLib(active));
</script>

<div class="w-full">
	<!-- 标签页 -->
	<div class="flex gap-2 mb-4">
		{#each libs as lib}
			<button
				class="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all
					{active === lib.key
					? 'bg-[var(--primary)] text-white shadow-md'
					: 'bg-[var(--card-bg)] text-90 hover:bg-[var(--btn-plain-bg-hover)]'}"
				on:click={() => switchLib(lib.key)}
			>
				<Icon icon={lib.icon} class="text-lg" />
				{lib.label}
				{#if data[lib.key]}
					<span class="text-xs opacity-70">{data[lib.key].length}</span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- 工具栏 -->
	<div class="flex flex-col sm:flex-row gap-2 mb-4">
		<div class="relative flex-1">
			<Icon
				icon="material-symbols:search"
				class="absolute left-3 top-1/2 -translate-y-1/2 text-90 opacity-40"
			/>
			<input
				type="text"
				bind:value={keyword}
				on:input={() => (page = 1)}
				placeholder="搜索中文 / 英文 / tag…"
				class="w-full pl-9 pr-3 py-2 rounded-lg bg-[var(--card-bg)] text-90
					border border-black/10 dark:border-white/10 outline-none focus:border-[var(--primary)]"
			/>
		</div>
		<select
			bind:value={category}
			on:change={() => (page = 1)}
			class="px-3 py-2 rounded-lg bg-[var(--card-bg)] text-90
				border border-black/10 dark:border-white/10 outline-none sm:w-56"
		>
			<option value="">全部分类</option>
			{#each categories as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</div>

	<!-- 状态行 -->
	<div class="text-sm text-90 opacity-60 mb-3">
		{#if loading}
			加载中…
		{:else}
			共 {filtered.length} 条 · 第 {page}/{pageCount} 页
		{/if}
	</div>

	<!-- 卡片墙 -->
	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
		{#each paged as e (active + e.id)}
			<div
				class="rounded-xl overflow-hidden bg-[var(--card-bg)] border border-black/5 dark:border-white/10
					hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
			>
				{#if e.preview}
					<a href={e.preview} target="_blank" rel="noopener" class="block bg-black/5 dark:bg-white/5">
						<img
							src={e.preview}
							alt={e.name}
							loading="lazy"
							class="w-full aspect-square object-contain"
						/>
					</a>
				{/if}
				<div class="p-2.5 flex flex-col gap-1 flex-1">
					<div class="font-medium text-sm text-90 leading-tight">
						{e.name_zh || e.name}
					</div>
					{#if e.name_zh && e.name}
						<div class="text-xs opacity-50 text-90 truncate">{e.name}</div>
					{/if}
					<div
						class="text-xs opacity-70 text-90 line-clamp-3 break-all flex-1"
						title={e.tags}
					>
						{e.tags}
					</div>
					<button
						class="mt-1 px-2 py-1 rounded-md text-xs font-medium transition-colors
							{copiedId === active + e.id
							? 'bg-green-500 text-white'
							: 'bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'}"
						on:click={() => copyTags(e)}
					>
						{copiedId === active + e.id ? "✓ 已复制" : "复制 tags"}
					</button>
				</div>
			</div>
		{/each}
	</div>

	{#if !loading && filtered.length === 0}
		<div class="text-center py-16 text-90 opacity-50">
			<Icon icon="material-symbols:search-off" class="text-5xl mb-2" />
			<div>没有找到匹配的条目</div>
		</div>
	{/if}

	<!-- 分页 -->
	{#if pageCount > 1}
		<div class="flex justify-center items-center gap-2 mt-6">
			<button
				class="px-3 py-1.5 rounded-lg bg-[var(--card-bg)] text-90 disabled:opacity-30
					border border-black/10 dark:border-white/10"
				disabled={page <= 1}
				on:click={() => (page = Math.max(1, page - 1))}
			>
				上一页
			</button>
			<span class="text-sm text-90 opacity-70">{page} / {pageCount}</span>
			<button
				class="px-3 py-1.5 rounded-lg bg-[var(--card-bg)] text-90 disabled:opacity-30
					border border-black/10 dark:border-white/10"
				disabled={page >= pageCount}
				on:click={() => (page = Math.min(pageCount, page + 1))}
			>
				下一页
			</button>
		</div>
	{/if}
</div>

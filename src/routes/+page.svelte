<script lang="ts">
	import dayjs from 'dayjs';
	import { calendar } from './calendar';
	import { twMerge } from 'tailwind-merge';
	import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-svelte';

	let currentDate = $state(dayjs());

	const beforeMonths = $derived(calendar.genMonths(currentDate, -3).reverse());
	const afterMonths = $derived(calendar.genMonths(currentDate, 3));
	const months = $derived([...beforeMonths, currentDate, ...afterMonths]);
	const rows = $derived(calendar.genCells(currentDate));
</script>

<div class="flex flex-col w-full p-6">
	<div class="flex gap-3 text-sm w-full justify-between font-medium">
		<button
			class="btn"
			onclick={() => {
				currentDate = currentDate.subtract(1, 'month');
			}}
		>
			<ChevronLeftIcon size={20} />
			Prev
		</button>
		{#each months as month}
			<button
				class={twMerge(
					'btn cursor-default!',
					currentDate.month() === month.month() && 'bg-black/10'
				)}
			>
				{month.format('MMM YY')}
			</button>
		{/each}
		<button
			class="btn"
			onclick={() => {
				currentDate = currentDate.add(1, 'month');
			}}
		>
			Next <ChevronRightIcon size={20} />
		</button>
	</div>

	<div class="flex flex-col w-full mt-12">
		<table class="table-fixed border-collapse w-full">
			<thead>
				<tr>
					{#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as d}
						<th class="border border-white w-full">
							<div class="cell">
								<span>{d}</span>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row}
					<tr class="w-full">
						{#each row as cell}
							<td class="border border-white w-full">
								<div
									class={twMerge(
										'cell',
										cell.month() !== currentDate.month() && 'bg-black opacity-10'
									)}
								>
									<span>{cell.format('D')}</span>
								</div>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

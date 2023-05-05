<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';

	export let user;
	export let form;
	export let tab = undefined;

	let selectedTab = tab ?? 0;
</script>

<div class="flex">
	<div class="flex h-full w-full gap-5">
		<ul class="menu rounded-box w-48 bg-base-200 p-2 ml-0">
			<li>
				<button class:active={selectedTab == 0} on:click={() => (selectedTab = 0)}>Account</button>
			</li>
			<li>
				<button class:active={selectedTab == 1} on:click={() => (selectedTab = 1)}>
					Forschung
				</button>
			</li>
		</ul>
		<div class="card card-compact bg-base-200 w-full">
			<div class="card-body">
				{#if selectedTab == 0}
					<h2 class="card-title">Account</h2>
					<form action="?/editAccount" method="POST" use:enhance>
						<div class="form-control">
							<label class="label" for="name">
								<span class="label-text">Name</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								class="input input-bordered bg-base-300 max-w-sm"
								value={user?.name ?? ""} />
						</div>
						<div class="form-control mt-2">
							<label class="label" for="email">
								<span class="label-text">E-Mail Adresse</span>
							</label>
							<input
								type="email"
								id="name"
								name="email"
								class="input input-bordered bg-base-300 max-w-sm"
								value={user?.email ?? ""} />
						</div>
						<input type="submit" class="btn btn-primary mt-4" value="Speichern" />
					</form>
				{/if}
				{#if selectedTab == 1}
					<h2 class="card-title">Forschung</h2>
					<div>
						<form action="?/editInfo" method="POST" class="inline-block">
							<div class="flex flex-wrap gap-5">
								<Input
									id="subjectArea"
									label="Fachbereich"
									value={form?.formData?.subjectArea ?? user.subjectArea ?? 'Informatik'}
									errorMsg={form?.errors?.subjectArea}
									suggestions />
								<Input
									id="areaOfExpertise"
									label="Fachgebiet"
									value={form?.formData?.areaOfExpertise ?? user.areaOfExpertise ?? ''}
									errorMsg={form?.errors?.areaOfExpertise}
									suggestions />
								<Input
									id="specialization"
									label="Keywords"
									value={form?.formData?.specialization ?? user.specialization ?? ''}
									errorMsg={form?.errors?.specialization}
									suggestions
									csv />
							</div>
							<Input
								id="keywords"
								label="Technologien"
								value={user.keywords ?? ''}
								suggestions
								csv />
							<input type="submit" class="btn btn-primary" value="Speichern" />
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

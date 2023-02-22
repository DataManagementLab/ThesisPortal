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
		<ul class="menu rounded-box w-48 bg-base-200 p-2">
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
					<form action="?/editName" method="POST" use:enhance>
						<div class="form-control">
							<label class="label" for="name">
								<span class="label-text">Name</span>
							</label>
							<span class="input-group">
								<input
									type="text"
									id="name"
									name="name"
									class="input input-bordered bg-base-300"
									value={user.name} />
								<input type="submit" class="btn btn-primary" value="Speichern" />
							</span>
						</div>
					</form>
					<form action="?/editEmail" method="POST" use:enhance>
						<div class="form-control">
							<label class="label" for="email">
								<span class="label-text">E-Mail Adresse</span>
							</label>
							<span class="input-group">
								<input
									type="email"
									id="name"
									name="email"
									class="input input-bordered bg-base-300"
									value={user.email} />
								<input type="submit" class="btn btn-primary" value="Speichern" />
							</span>
						</div>
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
									label="Spezialisierung"
									value={form?.formData?.specialization ?? user.specialization ?? ''}
									errorMsg={form?.errors?.specialization}
									suggestions />
							</div>
							<Input id="keywords" label="Keywords" value={user.keywords ?? ''} suggestions csv />
							<input type="submit" class="btn btn-primary" value="Speichern" />
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<template>
    <div class="card shadow border-0">
        <div class="card-body">
            <div class="d-flex flex-row justify-content-start align-items-center">
                <div class="p-3 bg-info rounded">
                    <unicon fill="primary" :name="iconName"></unicon>
                </div>
                <div class="ml-3">
                    <h3 class="h2 mb-0 font-weight-bold">{{ count }}</h3>
                    <p class="mb-0">{{ text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: null,
        iconName: { required: true },
        count: {type: Number, default: 0}
    }
}
</script>

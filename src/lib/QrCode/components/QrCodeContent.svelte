<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
    import { ListQrCodeDataType } from "../qrcode.data";
    import { generateVCard, generateEmail, generatePhone, generateSms, generateWifi, generateUrl, generateGeo, generateEvent } from "../qrcode.data";
    import InputContent from "$lib/components/inputContent.svelte";

    import { _ } from 'svelte-i18n';
    
    
    let defaultContent = "URL";
    
    let visible = false;
    
    const data_types = ListQrCodeDataType();
    
    let inputUrlContent = "https://touchify.io";
    let inputEmailContent = "";
    let inputEmailSubject = "";
    let inputSmsNumber = "";
    let inputSmsMessage = "";
    let inputPhone = "";
    let inputWifiName = "";
    let inputWifiAuth = "";
    let inputWifiPassword = "";
    let inputVCardLastName = "";
    let inputVCardFirstName = "";
    let inputVCardCompany = "";
    let inputVCardJob = "";
    let inputVCardPhone = "";
    let inputVCardEmail = "";
    let inputVCardWebsite = "";
    let inputGeoLatitude = "";
    let inputGeoLongitude = "";
    let inputEventTitle = "";
    let inputEventStartDate = "";
    let inputEventEndDate = "";
    

        export let data: string;

        $: switch (defaultContent) {
            case "URL":
                data = generateUrl(inputUrlContent);
                break;
            case "Email":
                data = generateEmail(inputEmailContent, inputEmailSubject);
                break;
            case "SMS":
                data = generateSms(inputSmsNumber, inputSmsMessage);
                break;
            case "Phone":
                data = generatePhone(inputPhone);
                break;
            case "Wifi":
                data = generateWifi(inputWifiName, inputWifiPassword, inputWifiAuth);
                break;
            case "Contact":
                data = generateVCard(inputVCardFirstName, inputVCardLastName, inputVCardCompany, inputVCardJob, inputVCardEmail, inputVCardPhone, inputVCardWebsite);
                break;
            case "Geo":
                data = generateGeo(inputGeoLatitude, inputGeoLongitude);
                break;
            case "Event":
                data = generateEvent(inputEventTitle, inputEventStartDate, inputEventEndDate);
                break;
        }

        $: console.log('QrCodeContent.svelte, variable =', inputUrlContent );
    


    function selectedType(data_type: any){
        defaultContent = data_type.type; 
        visible = false;
    }

</script>

<Card>
    <h1 class="font-semibold mb-2">{$_('data.title')}</h1>
    <input type="button" value={defaultContent} class="mb-2 self-start justify-start text-sm" on:click={() => visible = !visible} />
    <div>
        {#if visible == true}
        {#each data_types as data_type}
        <InputRadioButton on:click={() => selectedType(data_type) }>{data_type.type}</InputRadioButton>
        {/each}
        {/if}
    </div>
    {#if visible == false}
        {#if defaultContent == "URL"}
            <InputContent bind:value={inputUrlContent} />
        {/if}
        {#if defaultContent == "Email"}
            <label for="email" class='font-semibold'>{$_('data.email.address')}</label>
            <InputContent bind:value={inputEmailContent} />
            <label for="email" class='font-semibold'>{$_('data.email.subject')}</label>
            <InputContent bind:value={inputEmailSubject} />
        {/if}
        {#if defaultContent == "SMS"}
            <label for ="sms" class='font-semibold'>{$_('data.sms.number')}</label>
            <InputContent bind:value={inputSmsNumber} />
            <label for ="sms" class='font-semibold'>{$_('data.sms.message')}</label>
            <InputContent bind:value={inputSmsMessage} />
        {/if}
        {#if defaultContent == "Phone"}
            <InputContent bind:value={inputPhone} />
        {/if}
        {#if defaultContent == "Wifi"}
            <label for="wifi" class='font-semibold'>{$_('data.wifi.ssid')}</label>
            <InputContent bind:value={inputWifiName} />
            <label for="wifi" class='font-semibold'>{$_('data.wifi.auth')}</label>
            <InputContent bind:value={inputWifiAuth} />
            <label for="wifi" class='font-semibold'>{$_('data.wifi.password')}</label>
            <InputContent bind:value={inputWifiPassword} />
            <input type="checkbox" class="text-black text-sm rounded mt-3 mb-3 border bg-slate-100 w-full p-2 placeholder-black" />
        {/if}
        {#if defaultContent == "Contact"}
            <label for="contact" class='font-semibold'>{$_('data.contact.firstname')}</label>
            <InputContent bind:value={inputVCardFirstName} />
            <label for="contact" class='font-semibold'>{$_('data.contact.lastname')}</label>
            <InputContent bind:value={inputVCardLastName} />
            <label for="contact" class='font-semibold'>{$_('data.contact.company')}</label>
            <InputContent bind:value={inputVCardCompany} />
            <label for="contact" class='font-semibold'>{$_('data.contact.job')}</label>
            <InputContent bind:value={inputVCardJob} />
            <label for="contact" class='font-semibold'>{$_('data.contact.email')}</label>
            <InputContent bind:value={inputVCardEmail} />
            <label for="contact" class='font-semibold'>{$_('data.contact.phone')}</label>
            <InputContent bind:value={inputVCardPhone} />
            <label for="contact" class='font-semibold'>{$_('data.contact.url')}</label>
            <InputContent bind:value={inputVCardWebsite} />
        {/if}
        {#if defaultContent == "Geo"}
            <label for="geo" class='font-semibold'>{$_('data.geo.latitude')}</label>
            <InputContent bind:value={inputGeoLatitude} />
            <label for="geo" class='font-semibold'>{$_('data.geo.longitude')}</label>
            <InputContent bind:value={inputGeoLongitude} />
        {/if}
        {#if defaultContent == "Event"}
            <label for="event" class='font-semibold'>{$_('data.event.summary')}</label>
            <InputContent bind:value={inputEventTitle} />
            <label for="event" class='font-semibold'>{$_('data.event.start')}</label>
            <InputContent nameType="date" bind:value={inputEventStartDate} />
            <label for="event" class='font-semibold'>{$_('data.event.end')}</label>
            <InputContent nameType="date" bind:value={inputEventEndDate} />
        {/if}
    {/if}
</Card>

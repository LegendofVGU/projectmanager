({
	init: function (cmp, event, helper) {
        cmp.set('v.mapMarkers', [
            {
                location: {
                Latitude:cmp.get('v.OpptyRecord').Location__Latitude__s,
                Longitude:cmp.get('v.OpptyRecord').Location__Longitude__s
                },

                icon: 'utility:salesforce1',
                title: cmp.get('v.OpptyRecord').Name,
                description: cmp.get('v.OpptyRecord').Description__c
            }
        ]);

        cmp.set('v.center', {
            location: {
                City: cmp.get('v.OpptyRecord').City__c
            }
        });

        cmp.set('v.zoomLevel', 4);
        cmp.set('v.markersTitle', 'Event location');
        cmp.set('v.showFooter', true);
    }
})
AUI().ready(
        'liferay-hudcrumbs',
        function(A) {
            if (Liferay.Browser.isIe() && Liferay.Browser.getMajorVersion() < 7) {
                var navigation = A.one('#navigation > ul');

                if (navigation) {
                    navigation.delegate(
                            'mouseenter',
                            function(event) {
                                event.currentTarget.addClass('hover');
                            },
                            '> li'
                            );

                    navigation.delegate(
                            'mouseleave',
                            function(event) {
                                event.currentTarget.removeClass('hover');
                            },
                            '> li'
                            );
                }
            }

            A.use('get', function(B) {
                B.Get.script('/vgr-2-theme/js/jquery-1.4.3.min.js');
                B.Get.script('/vgr-2-theme/js/jquery.cookie.js');
                B.Get.script('/vgr-2-theme/js/slider.js');
            });

            var siteBreadcrumbs = A.one('.site-breadcrumbs');

            if (siteBreadcrumbs) {
                siteBreadcrumbs.plug(A.Hudcrumbs);
            }

        });


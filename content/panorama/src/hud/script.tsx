import 'panorama-polyfill/lib/console';
import 'panorama-polyfill/lib/timers';

import React from 'react';
import { render } from '@demon673/react-panorama';

function Test() {
    HelloZF();
    return <Label text="ZFeng this is a placeholder for react-panorama" />;
}

function HelloZF()
{
    console.log('HelloZF, ABCDEFG Zengfeng');
}

render(<Test />, $.GetContextPanel());

import React from 'react';

const HtmlStringComponent = () => {
    const htmlString = 'dsvad<u>asdva s</u><strong>asd cxvadsf</strong><em>sdfsvfdvdsf</em><ul><li>stserfstruevtrcykmnbvcjhgvc</li></ul>';

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    );
};

export default HtmlStringComponent;

import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
const Viewer = ({ content }) => {
    return (
        <CKEditor
        disabled={true}
        editor={ ClassicEditor }
        data={content}
        />
      );
};

export default Viewer;

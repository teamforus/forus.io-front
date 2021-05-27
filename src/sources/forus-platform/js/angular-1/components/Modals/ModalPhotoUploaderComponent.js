let ModalPhotoUploaderComponent = function(
    $element,
    MediaService,
    ImageConvertorService
) {
    let $ctrl = this;

    $ctrl.targetFile = false;
    $ctrl.confirmed = false;

    $ctrl.$onInit = () => {
        $ctrl.mediaConfig = MediaService.configByType($ctrl.modal.scope.type);
        $ctrl.mediaConfig.large_size = {
            w: $ctrl.mediaConfig.size.large[0],
            h: $ctrl.mediaConfig.size.large[1]
        };

        $ctrl.cropFile($ctrl.modal.scope.getFile());
    };

    $ctrl.cropFile = (file) => {
        $ctrl.targetFile = file;

        ImageConvertorService.instance($ctrl.targetFile).then((convertor) => {
            $ctrl.originalRatio = convertor.originalRatio();
            $ctrl.originalPhoto = convertor.getImage().src;
        });
    };

    $ctrl.changePhoto = () => {
        let input = document.createElement('input');

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.style.display = 'none';

        input.addEventListener('change', function(e) {
            $ctrl.cropFile(e.target.files[0]);
        });

        $element[0].appendChild(input);

        input.click();
    };

    $ctrl.onChange = () => {
        setTimeout(() => {
            if (!$ctrl.cropedPhoto) return;

            ImageConvertorService.instance(
                ImageConvertorService.dataURItoBlob($ctrl.cropedPhoto)
            ).then((convertorPreview) => {
                $ctrl.thumbnailUri = ImageConvertorService.createObjectURL(
                    convertorPreview.resizeToBlob(
                        $ctrl.mediaConfig.size.thumbnail[0],
                        $ctrl.mediaConfig.size.thumbnail[1]
                    )
                );
            });

            $ctrl.previewUri = ImageConvertorService.createObjectURL(
                ImageConvertorService.dataURItoBlob($ctrl.cropedPhoto)
            );
        }, 0);
    };
    
    $ctrl.cancel = () => {
        $ctrl.close();
    };

    $ctrl.apply = () => {
        let file = ImageConvertorService.dataURItoBlob($ctrl.cropedPhoto);

        file.name = $ctrl.targetFile.name;
        file.lastModified = $ctrl.targetFile.lastModified;
        file.lastModifiedDate = $ctrl.targetFile.lastModifiedDate;

        $ctrl.modal.scope.submit(file);
        $ctrl.close();
    };

    $ctrl.$onDestroy = function() {};
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$element',
        'MediaService',
        'ImageConvertorService',
        ModalPhotoUploaderComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-photo-upload.html';
    }
};
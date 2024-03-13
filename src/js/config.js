(function (PLUGIN_ID) {
  if (!location.href.includes('cybozu.com/k')) {
    window.alert('kintoneの画面から操作してください');
  } else {
    kintone.api(
      kintone.api.url('/k/v1/form', true),
      'GET',
      { app: kintone.app.getId() },
      (resp) => {
        const fields = resp.properties;
        let result = '';

        if (fields.length === 0) {
          window.alert('フィールドがありません');
        } else {
          fields.forEach((field) => {
            if (field.type === 'SUBTABLE') {
              field.fields.forEach((row) => {
                result += `<tr><td>${field.code}</td><td>${row.label}</td><td>${row.code}</td><td>${row.type}</td><td>${row.unique ? 'はい' : 'いいえ'}</td><td>${row.required ? 'はい' : 'いいえ'}</td></tr>`;
              });
            } else {
              result += `<tr><td></td><td>${field.label}</td><td>${field.code}</td><td>${field.type}</td><td>${field.unique ? 'はい' : 'いいえ'}</td><td>${field.required ? 'はい' : 'いいえ'}</td></tr>`;
            }
          });

          const tableBody = document.querySelector('#fieldsTable tbody');
          tableBody.innerHTML = result;
        }
      },
      (error) => {
        console.log(error);
      },
    );
  }
})(kintone.$PLUGIN_ID);

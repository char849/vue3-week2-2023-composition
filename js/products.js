import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// setup() apiUrl、apiPath、products、tempProduct
// const apiUrl = "https://vue3-course-api.hexschool.io/v2";
// const apiPath = "charlotte-lee849";

// const checkAdmin() 轉址
// const url = `${apiUrl}/api/user/check`;

// 取得產品總數 getData()
// const url = `${apiUrl}/api/${apiPath}/admin/products`;
// 展開單一產品 showProduct(product)

// 初使化  onMounted() 取出 Token
// const token = document.cookie.replace(
//     /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
//     "$1"
//   );
//   axios.defaults.headers.common.Authorization = token;
// checkAdmin()

createApp({
  setup() {
    const apiUrl = "https://vue3-course-api.hexschool.io/v2";
    const apiPath = "charlotte-lee849";
    const products = ref([]);
    const tempProduct = ref({});

    const checkAdmin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    };

    const getData = () => {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;
      axios
        .get(url)
        .then((res) => {
          products.value = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const showProduct = (product) => {
      tempProduct.value = product;
    };

    onMounted(() => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = token;
      checkAdmin();
    });

    return {
      products,
      tempProduct,
      showProduct, 
    }
  },
}).mount("#app");

export async function setLocale(currentValue) {
  const { locale } = this.$route.params;
  const { value } = currentValue;
  if (process.browser && value !== locale) { document.location.href = `/${value}/`; }
}

export function setLoading(value) {
  if (value) {
    document.querySelector('.spinner').className = 'spinner';
  } else {
    document.querySelector('.spinner').className = 'spinner no-visible';
    setTimeout(() => {
      if (!document.querySelector('.spinner').className.includes('hidden')) {
        document.querySelector('.spinner').className += ' hidden';
      }
    }, 500);
  }
}

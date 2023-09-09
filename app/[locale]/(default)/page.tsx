import { Locale } from '@/configs/i18n.config';
import { getDictionary } from '@/utils/dictionary';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { page } = await getDictionary(locale);

  return (
    <section>
      <div>
        <h1>{page.home.title}</h1>
        <p>{page.home.description}</p>
      </div>
    </section>
  );
}

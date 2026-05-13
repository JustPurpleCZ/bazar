import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Definice typu pro props (přizpůsobeno vašemu formátu)
type PageProps<T extends string> = {
  params: { locale: string };
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("page.home.title"),
    description: t("page.home.description"),
  };
}

export default async function Page(_: PageProps<"/[locale]">) {
  const t = await getTranslations();

  return (
    <Container size="sm" py="xl">
      {/* Horní hlavička s tlačítkem Zpět */}
      <Group justify="space-between" mb="lg" align="flex-end">
        <Title order={1} size="h2" fw={700}>
          {t("page.home.add_heading") /* Přidat nabídku */}
        </Title>
        <Anchor
          href="/cs/bazar"
          size="sm"
          c="orange"
          fw={500}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          <IconArrowLeft size={16} /> {t("page.home.back") /* Zpět */}
        </Anchor>
      </Group>

      {/* Hlavní formulářová karta */}
      <Paper withBorder shadow="xs" p="xl" radius="md">
        <Stack gap="md">
          <TextInput
            label={t("page.home.form.name_label") /* Název věci */}
            placeholder={t("page.home.form.name_placeholder") /* Např. Konferenční stolek */}
            withAsterisk
          />

          <Textarea
            label={t("page.home.form.desc_label") /* Popis */}
            placeholder={t("page.home.form.desc_placeholder") /* Popiš stav, rozměry... */}
            minRows={4}
          />

          <Select
            label={t("page.home.form.category_label") /* Kategorie */}
            placeholder={t("page.home.form.category_placeholder") /* Vyber kategorii */}
            data={[
              { value: "elektronika", label: t("category.electronics") },
              { value: "nabytek", label: t("category.furniture") },
              { value: "obleceni", label: t("category.clothes") },
              { value: "knihy", label: t("category.books") },
              { value: "detske", label: t("category.kids") },
              { value: "ostatni", label: t("category.other") },
            ]} // Zde pak napojíte data
            withAsterisk
          />

          <Group align="flex-end">
            <NumberInput
              label={t("page.home.form.price_label") /* Cena */}
              placeholder="0"
              suffix=" Kč"
              style={{ flex: 1 }}
            />
            <Checkbox label={t("page.home.form.free_label") /* Nabídka je zdarma */} mb="xs" />
          </Group>

          <SimpleGrid cols={2}>
            <TextInput
              label={t("page.home.form.contact_label") /* Jméno kontaktu */}
              placeholder={t("page.home.form.contact_placeholder") /* Tvé jméno */}
              withAsterisk
            />
            <TextInput label={t("page.home.form.email_label") /* E-mail */} placeholder="jmeno@example.com" />
          </SimpleGrid>

          <Select
            label={t("page.home.form.status_label") /* Stav nabídky */}
            defaultValue="dostupne"
            data={[
              { value: "dostupne", label: "Dostupné" },
              { value: "rezervovano", label: "Rezervováno" },
              { value: "prodano", label: "Prodáno" },
            ]}
          />

          <TextInput label={t("page.home.form.url_label") /* URL obrázku (volitelné) */} placeholder="https://..." />

          <Text size="xs" c="dimmed">
            {t("page.home.form.footer_info") /* Platbu a předání si domluvíš přímo s kupujícím. */}
          </Text>

          <Group justify="flex-end" mt="md">
            <Button color="orange" size="md" radius="md">
              {t("page.home.button_submit") /* Přidat nabídku */}
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}

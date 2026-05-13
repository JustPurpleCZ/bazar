import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { bazar } from "@/db/schemas/bazar.schema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("page.home.title"),
    description: t("page.home.description"),
  };
}

export default async function Page() {
  const t = await getTranslations();
  const listings = await db.select().from(bazar);

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" align="flex-start" mb="lg">
        <Stack gap={0}>
          <Title order={1}>{t("page.bazar.title")}</Title>
          <Text c="dimmed">{t("page.bazar.sub")}</Text>
        </Stack>
        <a href="/cs/upload">
          <Button color="orange" radius="md">
            {t("page.bazar.addOffer")}
          </Button>
        </a>
      </Group>

      <Stack mb="xl">
        <Group grow>
          <TextInput placeholder={t("page.bazar.searchPlaceholder")} leftSection={<IconSearch size={16} />} />
          <Select
            placeholder={t("common.category")}
            data={[
              { value: "elektronika", label: t("category.electronics") },
              { value: "nabytek", label: t("category.furniture") },
              { value: "obleceni", label: t("category.clothes") },
              { value: "knihy", label: t("category.books") },
              { value: "detske", label: t("category.kids") },
              { value: "ostatni", label: t("category.other") },
            ]}
          />
        </Group>
        <SegmentedControl
          data={[
            { label: t("common.filter.all"), value: "all" },
            { label: t("common.filter.free"), value: "free" },
            { label: t("common.filter.paid"), value: "paid" },
          ]}
        />
      </Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {listings.map((listing) => (
          <Card key="lowkey" withBorder radius="md" p="md">
            <Group justify="flex-end" mb="xs">
              <Badge color="teal" variant="light">
                {listing.status}
              </Badge>
            </Group>
            <Text fw={700} size="lg">
              {listing.name}
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              {listing.desc}
            </Text>
            <Button variant="light" color="orange" fullWidth>
              {t("page.bazar.viewDetail")}
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

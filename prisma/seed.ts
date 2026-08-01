import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const targets = [
    { title: 'School library fund', goalAmount: 400000, deadline: new Date('2026-12-01') },
    { title: 'End-of-year reunion', goalAmount: 60000, deadline: new Date('2026-11-15') },
    { title: 'Emergency support fund', goalAmount: 100000, deadline: null },
  ];

  for (const t of targets) {
    const existing = await prisma.target.findFirst({ where: { title: t.title } });
    if (existing) {
      console.log(`Skipping "${t.title}" — already exists`);
      continue;
    }
    const created = await prisma.target.create({ data: t });
    console.log(`Created target: ${created.title} (id: ${created.id})`);
  }

  const members = [
    { fullName: 'Meshack Dickens', phoneNumber: '254114263196', classYear: '2014', role: 'admin' as const },
    { fullName: 'Eunice Veronicah', phoneNumber: '254798397889', classYear: '2014', role: 'treasurer' as const },
    { fullName: 'Joshua Ochieng', phoneNumber: '254748895866', classYear: '2014', role: 'member' as const },
    { fullName: 'Allan Odhiambo', phoneNumber: '254769492646', classYear: '2014', role: 'member' as const },
    { fullName: "Christabel Adhing'a", phoneNumber: '254727252251', classYear: '2014', role: 'member' as const },
    { fullName: 'Gove Oloo', phoneNumber: '254710323939', classYear: '2014', role: 'member' as const },
    { fullName: 'Rachel Odenyo', phoneNumber: '254798577967', classYear: '2014', role: 'member' as const },
    { fullName: 'Taida Saruya', phoneNumber: '254708379117', classYear: '2014', role: 'member' as const },
    { fullName: 'Roselyn Achieng', phoneNumber: '254794573169', classYear: '2014', role: 'member' as const },
    { fullName: 'Daisy Achieng', phoneNumber: '254797628730', classYear: '2014', role: 'member' as const },
    { fullName: 'Emmanuel Odhiambo', phoneNumber: '254711297812', classYear: '2014', role: 'member' as const },
    { fullName: 'Charles Ochieng', phoneNumber: '254704286289', classYear: '2014', role: 'member' as const },
    { fullName: 'Otieno Alphonce', phoneNumber: '254742200497', classYear: '2014', role: 'member' as const },
    { fullName: 'Paul Oketch', phoneNumber: '254795908855', classYear: '2014', role: 'member' as const },
    { fullName: 'Akinyi Diana', phoneNumber: '254719553588', classYear: '2014', role: 'member' as const },
    { fullName: 'Elias Onyango', phoneNumber: '254740282856', classYear: '2014', role: 'member' as const },
    { fullName: "Dorine Achien'g", phoneNumber: '254720173377', classYear: '2014', role: 'member' as const },
    { fullName: 'Jane Odete', phoneNumber: '254115127230', classYear: '2014', role: 'member' as const },
    { fullName: 'Mercy Abwao', phoneNumber: '254757827730', classYear: '2014', role: 'member' as const },
    { fullName: 'Lilian Apiyo', phoneNumber: '254717642372', classYear: '2014', role: 'member' as const },
    { fullName: 'Yonah Omondi', phoneNumber: '254795525151', classYear: '2014', role: 'member' as const },
  ];

  for (const m of members) {
    const existing = await prisma.member.findUnique({ where: { phoneNumber: m.phoneNumber } });
    if (existing) {
      console.log(`Skipping ${m.fullName} — phone already registered`);
      continue;
    }
    const created = await prisma.member.create({ data: m });
    console.log(`Created member: ${created.fullName} (${created.role})`);
  }

  console.log(`\nSeeding complete. ${members.length} members and ${targets.length} funds processed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

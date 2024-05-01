export default function calculatePersentage(
    totalApplicant,
    vacancy
) {
    const persentage = (Number(totalApplicant) / vacancy) * 100;
    return persentage > 100 ? 100 : persentage;
}

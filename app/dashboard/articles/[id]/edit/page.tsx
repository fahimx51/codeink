import EditArticlePage from '@/components/articles/edit-article-page'
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const article = await prisma.article.findUnique({
        where: { id }
    });

    if (!article) {
        notFound();
    }

    return (
        <div>
            <EditArticlePage article={article} />
        </div>
    )
}

export default page;
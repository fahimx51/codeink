import EditArticlePage from '@/components/articles/edit-article-page'
import { prisma } from '@/lib/prisma';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const article = await prisma.article.findUnique({
        where: { id }
    });

    if (!article) {
        return <h1> Article not found with this id =  {id} </h1>
    }

    return (
        <div>
            <EditArticlePage article={article} />
        </div>
    )
}

export default page;
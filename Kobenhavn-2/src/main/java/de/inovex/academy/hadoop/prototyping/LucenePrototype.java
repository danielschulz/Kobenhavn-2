package de.inovex.academy.hadoop.prototyping;

import org.apache.commons.lang.StringUtils;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.core.StopAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopScoreDocCollector;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.util.QueryBuilder;
import org.apache.lucene.util.Version;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;

@SuppressWarnings("ALL")
public class LucenePrototype {

    // constants

    private static final String DOCUMENT_FIELD_TITLE = "title";
    private static final String DOCUMENT_FIELD_ARTISTS = "artists";
    private static final int PHRASE_SLOP = 3;
    private static final int HITS_PER_PAGE = 10;


    // member fields

    private static Analyzer analyzer;
    private static Directory directory;
    private static QueryBuilder queryBuilder;

    private static IndexWriter indexWriter;
    private static IndexWriterConfig indexWriterConfig;

    private static IndexReader indexReader;
    private static IndexSearcher indexSearcher;

    private static Query query;
    private static TopScoreDocCollector topScoreDocCollector;
    private static ScoreDoc[] hits;


    private static void run() throws IOException {

        creationIndex();
        query();
        search();
        display();

        indexWriter.close();
    }

    private static void creationIndex() throws IOException {

        analyzer = new StopAnalyzer(Version.LUCENE_4_9);

        directory = new RAMDirectory();
        indexWriterConfig = new IndexWriterConfig(Version.LUCENE_4_9, analyzer);
        indexWriter = new IndexWriter(directory, indexWriterConfig);

        indexWriter.addDocument(createDocument("Got to get you into my life", "The Beatles"));
        indexWriter.addDocument(createDocument("Got to get you into my life (live at the White House)", "Paul McCartney"));

        indexWriter.addDocument(createDocument("Norwegian Wood", "The Beatles"));
        indexWriter.addDocument(createDocument("Back in the USSR", "The Beatles"));

        indexWriter.addDocument(createDocument("I Wanna Be Like You", "Robbie Williams"));
        indexWriter.addDocument(createDocument("Puttin' on the Ritz", "Robbie Williams"));
        indexWriter.addDocument(createDocument("Swings Both Ways", "Robbie Williams"));

        indexWriter.addDocument(createDocument("Numb", "Linkin Park"));
        indexWriter.addDocument(createDocument("Nobody's Listienng", "Linkin Park"));
        indexWriter.addDocument(createDocument("Leave Out All The Rest", "Linkin Park"));
        indexWriter.addDocument(createDocument("In The End", "Linkin Park"));
        indexWriter.addDocument(createDocument("Burn It Down", "Linkin Park"));

        indexWriter.addDocument(createDocument("Get Behind Me Satan", "White Stripes"));

        indexWriter.addDocument(createDocument("Get Busy Living", "Goldfish"));
        indexWriter.addDocument(createDocument("Soundtracks and Comebacks", "Goldfish"));
        indexWriter.addDocument(createDocument("Fort Knox", "Goldfish"));
        indexWriter.addDocument(createDocument("Hold Tight", "Goldfish"));

        indexWriter.addDocument(createDocument("Robbers and Cowards", "Cold War Kids"));
        indexWriter.addDocument(createDocument("Ooh La La", "Goldfrapp"));
    }

    @SuppressWarnings("UnusedDeclaration")
    @NotNull
    private static Document createDocument(@NotNull final String title) {
        return createDocument(title, null);
    }

    @NotNull
    private static Document createDocument(@NotNull final String title, @Nullable final String artists) {

        final Document r = new Document();
        r.add(new TextField(DOCUMENT_FIELD_TITLE, title, Field.Store.YES));

        if (StringUtils.isNotBlank(artists)) {
            r.add(new TextField(DOCUMENT_FIELD_ARTISTS, artists, Field.Store.YES));
        }

        return r;
    }

    private static void query() {
        queryBuilder = new QueryBuilder(analyzer);
        query = queryBuilder.createPhraseQuery(DOCUMENT_FIELD_TITLE, "Back in the USSR", PHRASE_SLOP);
    }

    private static void search() throws IOException {
        indexReader = DirectoryReader.open(indexWriter, false);
        indexSearcher = new IndexSearcher(indexReader);
        topScoreDocCollector = TopScoreDocCollector.create(HITS_PER_PAGE, true);

        indexSearcher.search(query, topScoreDocCollector);
        hits = topScoreDocCollector.topDocs().scoreDocs;
    }

    private static void display() throws IOException {

        int i = 0;
        int docId;
        Document d;

        final StringBuilder r = new StringBuilder(String.format("Found %s document(s).\n", hits.length));
        for (final ScoreDoc c : hits) {

            docId = c.doc;
            d = indexSearcher.doc(docId);

            r.append(String.format("%s.\tScore: %s\tTitle: '%s'\tArtist: '%s'\n",
                    i + 1, c.score, d.get(DOCUMENT_FIELD_TITLE), d.get(DOCUMENT_FIELD_ARTISTS)));
            i++;
        }

        System.out.println(r);
    }

    public static void main(String[] args) throws IOException {
        run();
    }
}

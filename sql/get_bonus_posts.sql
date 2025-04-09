
drop function if exists get_bonus_posts(integer);


CREATE OR REPLACE FUNCTION get_bonus_posts(p_communityId INTEGER, p_bonusId INTEGER DEFAULT NULL) 
RETURNS TABLE ( id INTEGER,
    communityId INTEGER,
    updatedAt TIMESTAMP,
     title TEXT,
      img TEXT,
      "desc" TEXT,
         posts json) 
         AS $$ BEGIN RETURN QUERY
SELECT b.id,
    b."communityId",
    b."updatedAt",
    b."title",
    b."img",
    b."desc",
    json_agg(
        json_build_object(
            'duration',
            EXTRACT(
                EPOCH
                FROM (p."endTime" - p."date")
            ) / 60,
            'id',
            p.id,
            'title',
            p.title,
            'desc',
            p.desc,
            'media',
            p.media,
            'date',
            p."date",
            'creator',
            json_build_object(
                'id',
                c.id,
                'firstName',
                c."firstName",
                'lastName',
                c."lastName",
                'img',
                c.img
            )
        )
    ) FILTER (
        WHERE p.id IS NOT NULL
    ) AS posts
FROM "Bonus" b
    LEFT JOIN "_BonusToPost" bp ON b.id = bp."A"
    LEFT JOIN "Post" p ON bp."B" = p.id
    LEFT JOIN "Creator" c ON p."creatorId" = c.id
WHERE b."communityId" = p_communityId
 AND (p_bonusId IS NULL OR b.id = p_bonusId)
GROUP BY b.id
ORDER BY b."updatedAt" DESC;
END;
$$ LANGUAGE plpgsql;
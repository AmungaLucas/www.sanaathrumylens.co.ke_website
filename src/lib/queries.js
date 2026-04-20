import { query } from './db';

// =============================================
// BLOG/POST QUERIES
// =============================================

export async function getLatestArticles(limit = 6) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.published_at, b.stats_views, b.stats_likes, b.stats_comments,
      a.name as author_name, a.slug as author_slug, a.avatar as author_avatar
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.published_at IS NOT NULL AND b.is_deleted = FALSE
    ORDER BY b.published_at DESC
    LIMIT ?
  `, [limit]);
}

export async function getBlogBySlug(slug) {
  // Validate slug parameter
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug parameter:', slug);
    return null;
  }

  try {
    const blogs = await query(`
            SELECT 
                b.*, 
                a.name as author_name, 
                a.slug as author_slug, 
                a.avatar as author_avatar,
                a.bio as author_bio
            FROM posts b
            LEFT JOIN authors a ON b.author_id = a.id
            WHERE b.slug = ? AND b.status = 'published' AND b.is_deleted = FALSE
        `, [slug]);

    if (blogs.length === 0) return null;

    const blog = blogs[0];

    // Parse categories from JSON category_ids field
    let categories = [];
    if (blog.category_ids) {
      try {
        const catIds = typeof blog.category_ids === 'string' 
          ? JSON.parse(blog.category_ids) 
          : blog.category_ids;
        if (Array.isArray(catIds) && catIds.length > 0) {
          const placeholders = catIds.map(() => '?').join(',');
          categories = await query(`
            SELECT id, name, slug
            FROM categories
            WHERE id IN (${placeholders}) AND is_active = TRUE
          `, catIds);
        }
      } catch (e) {
        console.error('Error parsing category_ids:', e);
      }
    }

    // Parse tags from JSON tags field
    let tags = [];
    if (blog.tags) {
      try {
        const parsedTags = typeof blog.tags === 'string' 
          ? JSON.parse(blog.tags) 
          : blog.tags;
        if (Array.isArray(parsedTags)) {
          tags = parsedTags.map((t, i) => {
            if (typeof t === 'string') {
              return { id: i, name: t, slug: t.toLowerCase().replace(/\s+/g, '-') };
            }
            return t;
          });
        }
      } catch (e) {
        console.error('Error parsing tags:', e);
      }
    }

    // Increment view count (don't await)
    query('UPDATE posts SET stats_views = stats_views + 1 WHERE id = ?', [blog.id]).catch(console.error);

    return { ...blog, categories, tags };
  } catch (error) {
    console.error('Error in getBlogBySlug:', error);
    return null;
  }
}

export async function getRelatedArticles(blogId, categoryIds, limit = 3) {
  if (!categoryIds || categoryIds.length === 0) return [];

  const placeholders = categoryIds.map(() => '?').join(',');

  return await query(`
    SELECT DISTINCT
      b.id, b.title, b.slug, b.excerpt, b.featured_image, b.published_at,
      a.name as author_name, a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.id != ? AND b.status = 'published' AND b.is_deleted = FALSE
      AND (
        ${categoryIds.map(() => 'JSON_CONTAINS(b.category_ids, CAST(? AS JSON))').join(' OR ')}
      )
    ORDER BY b.published_at DESC
    LIMIT ?
  `, [blogId, ...categoryIds.map(id => String(id)), limit]);
}

export async function getAllBlogs(limit = 12, offset = 0) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.published_at, b.stats_views, b.stats_likes,
      a.name as author_name, a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_deleted = FALSE
    ORDER BY b.published_at DESC
    LIMIT ? OFFSET ?
  `, [limit, offset]);
}

export async function countAllBlogs() {
  const result = await query(`
    SELECT COUNT(*) as total FROM posts WHERE status = 'published' AND is_deleted = FALSE
  `);
  return result[0].total;
}

// =============================================
// HOMEPAGE QUERIES
// =============================================

export async function getTrendingArticles(limit = 5) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.stats_views, b.stats_likes, a.name as author_name, a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_deleted = FALSE
      AND b.published_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ORDER BY (b.stats_views * 0.7 + b.stats_likes * 0.3) DESC
    LIMIT ?
  `, [limit]);
}

export async function getPopularArticles(limit = 3) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.stats_views, b.stats_likes, b.stats_comments,
      a.name as author_name, a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_deleted = FALSE
    ORDER BY b.stats_views DESC, b.stats_likes DESC
    LIMIT ?
  `, [limit]);
}

export async function getEditorsPicks(limit = 4) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      a.name as author_name, a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_featured = TRUE AND b.is_deleted = FALSE
    ORDER BY b.published_at DESC
    LIMIT ?
  `, [limit]);
}

export async function getFeaturedArticle() {
  const result = await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.stats_views, b.stats_likes, a.name as author_name, a.slug as author_slug
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_featured = TRUE AND b.is_deleted = FALSE
    ORDER BY b.published_at DESC
    LIMIT 1
  `);
  return result[0] || null;
}

// =============================================
// AUTHOR QUERIES
// =============================================

export async function getAuthorBySlug(slug) {
  const authors = await query(`
    SELECT 
      id, slug, name, bio, avatar, created_at
    FROM authors
    WHERE slug = ?
  `, [slug]);

  if (authors.length === 0) return null;
  return authors[0];
}

export async function getArticlesByAuthor(authorId, limit = 9, offset = 0) {
  return await query(`
    SELECT 
      id, title, slug, excerpt, featured_image,
      published_at, stats_views, stats_likes, stats_comments
    FROM posts
    WHERE author_id = ? AND status = 'published' AND is_deleted = FALSE
    ORDER BY published_at DESC
    LIMIT ? OFFSET ?
  `, [authorId, limit, offset]);
}

export async function getAuthorSpecialties(authorId) {
  // author_specialties table doesn't exist in actual DB
  return [];
}

export async function getAuthorEducation(authorId) {
  // author_education table doesn't exist in actual DB
  return [];
}

export async function getAuthorExperience(authorId) {
  // author_experience table doesn't exist in actual DB
  return [];
}

export async function getTopAuthors(limit = 5) {
  return await query(`
    SELECT 
      a.id, a.name, a.slug, a.avatar
    FROM authors a
    INNER JOIN posts b ON b.author_id = a.id AND b.status = 'published' AND b.is_deleted = FALSE
    GROUP BY a.id, a.name, a.slug, a.avatar
    ORDER BY COUNT(b.id) DESC
    LIMIT ?
  `, [limit]);
}


export async function getPopularTags(limit = 15) {
  // tags table doesn't exist as a separate entity in actual DB.
  // Posts have a JSON 'tags' field. We extract unique tags from published posts.
  try {
    const rows = await query(`
      SELECT tags
      FROM posts
      WHERE status = 'published' AND is_deleted = FALSE AND tags IS NOT NULL AND tags != '[]' AND tags != ''
      ORDER BY published_at DESC
      LIMIT 100
    `);

    const tagCount = {};
    for (const row of rows) {
      let parsed = row.tags;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch { continue; }
      }
      if (Array.isArray(parsed)) {
        for (const t of parsed) {
          const name = typeof t === 'string' ? t : (t.name || '');
          if (name) {
            tagCount[name] = (tagCount[name] || 0) + 1;
          }
        }
      }
    }

    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count], i) => ({
        id: i + 1,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        usage_count: count,
      }));
  } catch (error) {
    console.error('Error fetching popular tags:', error);
    return [];
  }
}

// =============================================
// SIDEBAR QUERIES
// =============================================

export async function getRecentStories(limit = 4) {
  try {
    return await query(`
      SELECT id, title, slug, published_at
      FROM posts
      WHERE status = 'published' AND is_deleted = FALSE
      ORDER BY published_at DESC
      LIMIT ?
    `, [limit]);
  } catch (error) {
    console.error('Error fetching recent stories:', error);
    return [];
  }
}



// =============================================
// EVENT QUERIES
// =============================================

export async function getAllEvents(limit = 12, offset = 0, filters = {}) {
  let sql = `
    SELECT 
      e.id,
      e.title,
      e.slug,
      e.excerpt,
      e.featured_image,
      e.start_date,
      e.end_date,
      e.location,
      e.is_online,
      e.status
    FROM events e
    WHERE e.start_date >= NOW()
      AND e.status = 'published'
      AND e.is_deleted = FALSE
  `;

  const params = [];

  if (filters.eventType === 'online') {
    sql += ` AND e.is_online = TRUE`;
  } else if (filters.eventType === 'inperson') {
    sql += ` AND e.is_online = FALSE`;
  }

  if (filters.location) {
    sql += ` AND e.location LIKE ?`;
    params.push(`%${filters.location}%`);
  }

  if (filters.month) {
    sql += ` AND MONTH(e.start_date) = ?`;
    params.push(filters.month);
  }

  sql += ` ORDER BY e.start_date ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await query(sql, params);
}

export async function countAllEvents(filters = {}) {
  let sql = `
    SELECT COUNT(*) as total 
    FROM events e
    WHERE e.start_date >= NOW()
      AND e.status = 'published'
      AND e.is_deleted = FALSE
  `;

  const params = [];

  if (filters.eventType === 'online') {
    sql += ` AND e.is_online = TRUE`;
  } else if (filters.eventType === 'inperson') {
    sql += ` AND e.is_online = FALSE`;
  }

  if (filters.location) {
    sql += ` AND e.location LIKE ?`;
    params.push(`%${filters.location}%`);
  }

  if (filters.month) {
    sql += ` AND MONTH(e.start_date) = ?`;
    params.push(filters.month);
  }

  const result = await query(sql, params);
  return result[0].total;
}

export async function getEventBySlug(slug) {
  const events = await query(`
    SELECT 
      e.*
    FROM events e
    WHERE e.slug = ? AND e.status = 'published' AND e.is_deleted = FALSE
  `, [slug]);

  if (events.length === 0) return null;
  return events[0];
}

export async function getUpcomingEvents(limit = 5) {
  return await query(`
    SELECT 
      id,
      title,
      slug,
      excerpt,
      featured_image,
      start_date,
      end_date,
      location,
      is_online
    FROM events
    WHERE start_date >= NOW()
      AND status = 'published'
      AND is_deleted = FALSE
    ORDER BY start_date ASC
    LIMIT ?
  `, [limit]);
}

export async function getFeaturedEvents(limit = 3) {
  return await query(`
    SELECT 
      id,
      title,
      slug,
      excerpt,
      featured_image,
      start_date,
      end_date,
      location,
      is_online
    FROM events
    WHERE start_date >= NOW()
      AND status = 'published'
      AND is_deleted = FALSE
    ORDER BY start_date ASC
    LIMIT ?
  `, [limit]);
}

export async function getEventsByMonth(year, month, limit = 12, offset = 0) {
  return await query(`
    SELECT 
      id,
      title,
      slug,
      excerpt,
      featured_image,
      start_date,
      end_date,
      location,
      is_online
    FROM events
    WHERE YEAR(start_date) = ?
      AND MONTH(start_date) = ?
      AND start_date >= NOW()
      AND status = 'published'
      AND is_deleted = FALSE
    ORDER BY start_date ASC
    LIMIT ? OFFSET ?
  `, [year, month, limit, offset]);
}

export async function getEventLocations() {
  return await query(`
    SELECT DISTINCT location as location, COUNT(*) as event_count
    FROM events
    WHERE status = 'published'
      AND is_deleted = FALSE
      AND start_date >= NOW()
      AND location IS NOT NULL
    GROUP BY location
    ORDER BY event_count DESC
    LIMIT 20
  `);
}

export async function getEventMonths() {
  return await query(`
    SELECT 
      DISTINCT YEAR(start_date) as year,
      MONTH(start_date) as month,
      DATE_FORMAT(start_date, '%M %Y') as label,
      COUNT(*) as event_count
    FROM events
    WHERE status = 'published'
      AND is_deleted = FALSE
      AND start_date >= NOW()
    GROUP BY year, month
    ORDER BY year ASC, month ASC
  `);
}

export async function rsvpToEvent(eventId, userId, name, email, guestsCount = 1) {
  // event_attendees table doesn't exist in actual DB.
  // This is a no-op but keeps the interface consistent.
  console.warn('rsvpToEvent: event_attendees table does not exist in the database.');
  return { success: true, message: 'RSVP feature is not available.' };
}

export async function checkUserRSVP(eventId, userId) {
  // event_attendees table doesn't exist in actual DB.
  return false;
}


// =============================================
// CATEGORY QUERIES
// =============================================

export async function getAllCategories(limit = null) {
  let sql = `
    SELECT 
      c.id, 
      c.name, 
      c.slug, 
      c.description,
      (SELECT COUNT(*) FROM posts 
       WHERE JSON_CONTAINS(category_ids, CAST(c.id AS CHAR)) 
       AND status = 'published' AND is_deleted = FALSE) as post_count
    FROM categories c
    WHERE c.is_active = TRUE
    GROUP BY c.id
    ORDER BY c.name ASC
  `;

  if (limit) {
    sql += ` LIMIT ${limit}`;
  }

  return await query(sql);
}

export async function getCategoryBySlug(slug) {
  const categories = await query(`
    SELECT id, name, slug, description
    FROM categories
    WHERE slug = ? AND is_active = TRUE
  `, [slug]);
  return categories[0] || null;
}

export async function getArticlesByCategory(categoryId, limit = 12, offset = 0) {
  return await query(`
    SELECT 
      b.id,
      b.title,
      b.slug,
      b.excerpt,
      b.featured_image,
      b.published_at,
      b.stats_views,
      b.stats_likes,
      b.stats_comments,
      a.name as author_name,
      a.slug as author_slug,
      a.avatar as author_avatar
    FROM posts b
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE b.status = 'published' AND b.is_deleted = FALSE
      AND JSON_CONTAINS(b.category_ids, CAST(? AS CHAR))
    ORDER BY b.published_at DESC
    LIMIT ? OFFSET ?
  `, [String(categoryId), limit, offset]);
}

export async function getCategoryCount(categoryId) {
  const result = await query(`
    SELECT COUNT(*) as total
    FROM posts
    WHERE status = 'published' AND is_deleted = FALSE
      AND JSON_CONTAINS(category_ids, CAST(? AS CHAR))
  `, [String(categoryId)]);
  return result[0].total;
}

// =============================================
// TAG QUERIES
// =============================================

export async function getTagBySlug(slug) {
  try {
    // tags table doesn't exist as separate entity.
    // Search within posts JSON tags field.
    const posts = await query(`
      SELECT tags
      FROM posts
      WHERE status = 'published' AND is_deleted = FALSE AND tags IS NOT NULL AND tags != '[]' AND tags != ''
      LIMIT 500
    `);

    for (const row of posts) {
      let parsed = row.tags;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch { continue; }
      }
      if (Array.isArray(parsed)) {
        for (const t of parsed) {
          const name = typeof t === 'string' ? t : (t.name || '');
          const tagSlug = name.toLowerCase().replace(/\s+/g, '-');
          if (tagSlug === slug) {
            return { id: 0, name, slug: tagSlug, usage_count: 0 };
          }
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching tag by slug:', error);
    return null;
  }
}

export async function getArticlesByTag(tagSlug, limit = 12, offset = 0) {
  try {
    // Search posts by tag name in JSON tags field
    const posts = await query(`
      SELECT
        b.id,
        b.title,
        b.slug,
        b.excerpt,
        b.featured_image,
        b.published_at,
        b.stats_views,
        b.stats_likes,
        b.stats_comments,
        a.name as author_name,
        a.slug as author_slug,
        a.avatar as author_avatar
      FROM posts b
      LEFT JOIN authors a ON b.author_id = a.id
      WHERE b.status = 'published' AND b.is_deleted = FALSE
        AND b.tags IS NOT NULL AND b.tags != '[]' AND b.tags != ''
      ORDER BY b.published_at DESC
    `, []);

    // Filter by tag slug
    const filtered = posts.filter(p => {
      let parsed = p.tags;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch { return false; }
      }
      if (!Array.isArray(parsed)) return false;
      return parsed.some(t => {
        const name = typeof t === 'string' ? t : (t.name || '');
        return name.toLowerCase().replace(/\s+/g, '-') === tagSlug;
      });
    });

    return filtered.slice(offset, offset + limit);
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
    return [];
  }
}

export async function getTagCount(tagSlug) {
  try {
    const posts = await query(`
      SELECT COUNT(*) as total
      FROM posts
      WHERE status = 'published' AND is_deleted = FALSE
        AND tags IS NOT NULL AND tags != '[]' AND tags != ''
    `);

    // This is approximate; we can't easily do JSON_CONTAINS with a slug
    // Just return the total from posts with tags
    return posts[0]?.total || 0;
  } catch (error) {
    console.error('Error counting tag:', error);
    return 0;
  }
}

export async function getRelatedTags(tagSlug, limit = 10) {
  // tags table doesn't exist; return empty
  return [];
}


// =============================================
// BOOKMARK QUERIES
// =============================================

export async function getUserBookmarks(userId, limit = 20, offset = 0) {
  return await query(`
    SELECT 
      b.id,
      b.title,
      b.slug,
      b.excerpt,
      b.featured_image,
      b.published_at,
      b.stats_views,
      a.name as author_name,
      a.slug as author_slug,
      bm.created_at as saved_at
    FROM bookmarks bm
    JOIN posts b ON bm.post_id = b.id
    LEFT JOIN authors a ON b.author_id = a.id
    WHERE bm.user_id = ? AND b.status = 'published' AND b.is_deleted = FALSE
    ORDER BY bm.created_at DESC
    LIMIT ? OFFSET ?
  `, [userId, limit, offset]);
}

export async function countUserBookmarks(userId) {
  const result = await query(`
    SELECT COUNT(*) as total
    FROM bookmarks
    WHERE user_id = ?
  `, [userId]);
  return result[0].total;
}

// =============================================
// FOLLOW QUERIES
// =============================================

export async function getUserFollowing(userId, limit = 20, offset = 0) {
  // author_followers table doesn't exist in actual DB
  return [];
}

export async function getUserFollowers(authorId, limit = 20, offset = 0) {
  // author_followers table doesn't exist in actual DB
  return [];
}

// =============================================
// REPORT QUERIES (Admin)
// =============================================

export async function getPendingReports(limit = 50, offset = 0) {
  // content_reports table doesn't exist; only comment_reports exists
  return [];
}

export async function resolveReport(reportId, adminId, status, notes) {
  // content_reports table doesn't exist; only comment_reports exists
  return { success: true };
}

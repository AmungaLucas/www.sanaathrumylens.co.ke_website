import { query } from './db';

// =============================================
// BLOG QUERIES
// =============================================

export async function getLatestArticles(limit = 6) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.published_at, b.view_count, b.like_count, b.comment_count,
      a.name as author_name, a.slug as author_slug, a.avatar_url as author_avatar
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE b.status = 'PUBLISHED' AND b.published_at IS NOT NULL
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
                a.avatar_url as author_avatar,
                a.bio as author_bio, 
                a.author_title, 
                a.is_verified as author_verified,
                a.twitter_handle, 
                a.linkedin_url, 
                a.instagram_handle
            FROM blogs b
            LEFT JOIN admin_users a ON b.author_id = a.id
            WHERE b.slug = ? AND b.status = 'PUBLISHED'
        `, [slug]); // slug is validated, so safe to pass

    if (blogs.length === 0) return null;

    const blog = blogs[0];

    // Get categories - make sure blog.id exists
    const categories = await query(`
            SELECT c.id, c.name, c.slug
            FROM categories c
            JOIN blog_categories bc ON bc.category_id = c.id
            WHERE bc.blog_id = ?
        `, [blog.id]);

    // Get tags
    const tags = await query(`
            SELECT t.id, t.name, t.slug
            FROM tags t
            JOIN blog_tags bt ON bt.tag_id = t.id
            WHERE bt.blog_id = ?
        `, [blog.id]);

    // Increment view count (don't await)
    query('UPDATE blogs SET view_count = view_count + 1 WHERE id = ?', [blog.id]).catch(console.error);

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
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    JOIN blog_categories bc ON bc.blog_id = b.id
    WHERE b.id != ? AND b.status = 'PUBLISHED'
      AND bc.category_id IN (${placeholders})
    ORDER BY b.published_at DESC
    LIMIT ?
  `, [blogId, ...categoryIds, limit]);
}

export async function getAllBlogs(limit = 12, offset = 0) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.published_at, b.view_count, b.like_count,
      a.name as author_name, a.slug as author_slug
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE b.status = 'PUBLISHED'
    ORDER BY b.published_at DESC
    LIMIT ? OFFSET ?
  `, [limit, offset]);
}

export async function countAllBlogs() {
  const result = await query(`
    SELECT COUNT(*) as total FROM blogs WHERE status = 'PUBLISHED'
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
      b.view_count, b.like_count, a.name as author_name, a.slug as author_slug
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE b.status = 'PUBLISHED'
      AND b.published_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ORDER BY (b.view_count * 0.7 + b.like_count * 0.3) DESC
    LIMIT ?
  `, [limit]);
}

export async function getPopularArticles(limit = 3) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.view_count, b.like_count, b.comment_count,
      a.name as author_name, a.slug as author_slug
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE b.status = 'PUBLISHED'
    ORDER BY b.view_count DESC, b.like_count DESC
    LIMIT ?
  `, [limit]);
}

export async function getEditorsPicks(limit = 4) {
  return await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      a.name as author_name, a.slug as author_slug
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE b.status = 'PUBLISHED' AND b.is_editors_pick = TRUE
    ORDER BY b.published_at DESC
    LIMIT ?
  `, [limit]);
}

export async function getFeaturedArticle() {
  const result = await query(`
    SELECT 
      b.id, b.title, b.slug, b.excerpt, b.featured_image,
      b.view_count, b.like_count, a.name as author_name, a.slug as author_slug
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE b.status = 'PUBLISHED' AND b.is_featured = TRUE
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
      id, name, slug, avatar_url, cover_image_url, bio, short_bio,
      location, author_title, is_verified, is_featured_author,
      twitter_handle, linkedin_url, github_url, instagram_handle,
      website, company, job_title, years_of_experience,
      total_posts, total_views, total_likes, follower_count, created_at
    FROM admin_users
    WHERE slug = ? AND status = 'ACTIVE'
  `, [slug]);

  if (authors.length === 0) return null;
  return authors[0];
}

export async function getArticlesByAuthor(authorId, limit = 9, offset = 0) {
  return await query(`
    SELECT 
      id, title, slug, excerpt, featured_image,
      published_at, view_count, like_count, comment_count
    FROM blogs
    WHERE author_id = ? AND status = 'PUBLISHED'
    ORDER BY published_at DESC
    LIMIT ? OFFSET ?
  `, [authorId, limit, offset]);
}

export async function getAuthorSpecialties(authorId) {
  return await query(`
    SELECT specialty, expertise_level
    FROM author_specialties
    WHERE author_id = ?
  `, [authorId]);
}

export async function getAuthorEducation(authorId) {
  return await query(`
    SELECT institution, degree, field_of_study, start_year, end_year, is_current
    FROM author_education
    WHERE author_id = ?
    ORDER BY end_year DESC
  `, [authorId]);
}

export async function getAuthorExperience(authorId) {
  return await query(`
    SELECT company, job_title, location, start_date, end_date, is_current, description
    FROM author_experience
    WHERE author_id = ?
    ORDER BY is_current DESC, end_date DESC
  `, [authorId]);
}

export async function getTopAuthors(limit = 5) {
  return await query(`
    SELECT 
      id, name, slug, avatar_url, author_title, is_verified,
      total_posts, total_views
    FROM admin_users
    WHERE status = 'ACTIVE' AND total_posts > 0
    ORDER BY total_views DESC, total_posts DESC
    LIMIT ?
  `, [limit]);
}


export async function getPopularTags(limit = 15) {
  try {
    return await query(`
      SELECT id, name, slug, usage_count
      FROM tags
      ORDER BY usage_count DESC
      LIMIT ?
    `, [limit]);
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
      FROM blogs
      WHERE status = 'PUBLISHED'
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
      e.event_date,
      e.event_end_date,
      e.location_name,
      e.is_online,
      e.attendees_count,
      e.capacity,
      e.status
    FROM events e
    WHERE e.event_date >= NOW()
      AND e.status = 'PUBLISHED'
  `;

  const params = [];

  if (filters.eventType === 'online') {
    sql += ` AND e.is_online = TRUE`;
  } else if (filters.eventType === 'inperson') {
    sql += ` AND e.is_online = FALSE`;
  }

  if (filters.location) {
    sql += ` AND e.location_name LIKE ?`;
    params.push(`%${filters.location}%`);
  }

  if (filters.month) {
    sql += ` AND MONTH(e.event_date) = ?`;
    params.push(filters.month);
  }

  sql += ` ORDER BY e.event_date ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  return await query(sql, params);
}

export async function countAllEvents(filters = {}) {
  let sql = `
    SELECT COUNT(*) as total 
    FROM events e
    WHERE e.event_date >= NOW()
      AND e.status = 'PUBLISHED'
  `;

  const params = [];

  if (filters.eventType === 'online') {
    sql += ` AND e.is_online = TRUE`;
  } else if (filters.eventType === 'inperson') {
    sql += ` AND e.is_online = FALSE`;
  }

  if (filters.location) {
    sql += ` AND e.location_name LIKE ?`;
    params.push(`%${filters.location}%`);
  }

  if (filters.month) {
    sql += ` AND MONTH(e.event_date) = ?`;
    params.push(filters.month);
  }

  const result = await query(sql, params);
  return result[0].total;
}

export async function getEventBySlug(slug) {
  const events = await query(`
    SELECT 
      e.*,
      (SELECT COUNT(*) FROM event_attendees WHERE event_id = e.id AND status = 'GOING') as confirmed_attendees
    FROM events e
    WHERE e.slug = ? AND e.status = 'PUBLISHED'
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
      event_date,
      location_name,
      is_online
    FROM events
    WHERE event_date >= NOW()
      AND status = 'PUBLISHED'
    ORDER BY event_date ASC
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
      event_date,
      location_name,
      is_online,
      attendees_count
    FROM events
    WHERE event_date >= NOW()
      AND status = 'PUBLISHED'
      AND is_featured = TRUE
    ORDER BY event_date ASC
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
      event_date,
      location_name,
      is_online
    FROM events
    WHERE YEAR(event_date) = ?
      AND MONTH(event_date) = ?
      AND event_date >= NOW()
      AND status = 'PUBLISHED'
    ORDER BY event_date ASC
    LIMIT ? OFFSET ?
  `, [year, month, limit, offset]);
}

export async function getEventLocations() {
  return await query(`
    SELECT DISTINCT location_name as location, COUNT(*) as event_count
    FROM events
    WHERE status = 'PUBLISHED'
      AND event_date >= NOW()
      AND location_name IS NOT NULL
    GROUP BY location_name
    ORDER BY event_count DESC
    LIMIT 20
  `);
}

export async function getEventMonths() {
  return await query(`
    SELECT 
      DISTINCT YEAR(event_date) as year,
      MONTH(event_date) as month,
      DATE_FORMAT(event_date, '%M %Y') as label,
      COUNT(*) as event_count
    FROM events
    WHERE status = 'PUBLISHED'
      AND event_date >= NOW()
    GROUP BY year, month
    ORDER BY year ASC, month ASC
  `);
}

export async function rsvpToEvent(eventId, userId, name, email, guestsCount = 1) {
  // Check if already RSVP'd
  const existing = await query(`
    SELECT id FROM event_attendees 
    WHERE event_id = ? AND email = ?
  `, [eventId, email]);

  if (existing.length > 0) {
    // Update existing RSVP
    await query(`
      UPDATE event_attendees 
      SET status = 'GOING', guests_count = ?, user_id = ?
      WHERE event_id = ? AND email = ?
    `, [guestsCount, userId || null, eventId, email]);
  } else {
    // New RSVP
    await query(`
      INSERT INTO event_attendees (event_id, user_id, name, email, guests_count, status)
      VALUES (?, ?, ?, ?, ?, 'GOING')
    `, [eventId, userId || null, name, email, guestsCount]);
  }

  // Update attendee count
  await query(`
    UPDATE events 
    SET attendees_count = (
      SELECT COUNT(*) FROM event_attendees 
      WHERE event_id = ? AND status = 'GOING'
    )
    WHERE id = ?
  `, [eventId, eventId]);

  return { success: true };
}

export async function checkUserRSVP(eventId, userId) {
  if (!userId) return false;

  const result = await query(`
    SELECT id FROM event_attendees 
    WHERE event_id = ? AND user_id = ? AND status = 'GOING'
  `, [eventId, userId]);

  return result.length > 0;
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
      COUNT(bc.blog_id) as post_count
    FROM categories c
    LEFT JOIN blog_categories bc ON bc.category_id = c.id
    LEFT JOIN blogs b ON b.id = bc.blog_id AND b.status = 'PUBLISHED'
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
      b.view_count,
      b.like_count,
      b.comment_count,
      a.name as author_name,
      a.slug as author_slug,
      a.avatar_url as author_avatar
    FROM blogs b
    LEFT JOIN admin_users a ON b.author_id = a.id
    JOIN blog_categories bc ON bc.blog_id = b.id
    WHERE b.status = 'PUBLISHED'
      AND bc.category_id = ?
    ORDER BY b.published_at DESC
    LIMIT ? OFFSET ?
  `, [categoryId, limit, offset]);
}

export async function getCategoryCount(categoryId) {
  const result = await query(`
    SELECT COUNT(*) as total
    FROM blogs b
    JOIN blog_categories bc ON bc.blog_id = b.id
    WHERE b.status = 'PUBLISHED'
      AND bc.category_id = ?
  `, [categoryId]);
  return result[0].total;
}

// =============================================
// TAG QUERIES
// =============================================

export async function getTagBySlug(slug) {
  try {
    const tags = await query(`
      SELECT id, name, slug, usage_count
      FROM tags
      WHERE slug = ?
    `, [slug]);
    return tags[0] || null;
  } catch (error) {
    console.error('Error fetching tag by slug:', error);
    return null;
  }
}

export async function getArticlesByTag(tagId, limit = 12, offset = 0) {
  try {
    return await query(`
      SELECT
        b.id,
        b.title,
        b.slug,
        b.excerpt,
        b.featured_image,
        b.published_at,
        b.view_count,
        b.like_count,
        b.comment_count,
        a.name as author_name,
        a.slug as author_slug,
        a.avatar_url as author_avatar
      FROM blogs b
      LEFT JOIN admin_users a ON b.author_id = a.id
      JOIN blog_tags bt ON bt.blog_id = b.id
      WHERE b.status = 'PUBLISHED'
        AND bt.tag_id = ?
      ORDER BY b.published_at DESC
      LIMIT ? OFFSET ?
    `, [tagId, limit, offset]);
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
    return [];
  }
}

export async function getTagCount(tagId) {
  const result = await query(`
    SELECT COUNT(*) as total
    FROM blogs b
    JOIN blog_tags bt ON bt.blog_id = b.id
    WHERE b.status = 'PUBLISHED'
      AND bt.tag_id = ?
  `, [tagId]);
  return result[0].total;
}

export async function getRelatedTags(tagId, limit = 10) {
  // Find tags that appear in similar articles
  return await query(`
    SELECT DISTINCT t.id, t.name, t.slug, t.usage_count
    FROM tags t
    JOIN blog_tags bt ON bt.tag_id = t.id
    JOIN blog_tags bt2 ON bt2.blog_id = bt.blog_id
    WHERE bt2.tag_id = ?
      AND t.id != ?
    GROUP BY t.id
    ORDER BY t.usage_count DESC
    LIMIT ?
  `, [tagId, tagId, limit]);
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
      b.view_count,
      a.name as author_name,
      a.slug as author_slug,
      bs.created_at as saved_at
    FROM blog_saves bs
    JOIN blogs b ON bs.blog_id = b.id
    LEFT JOIN admin_users a ON b.author_id = a.id
    WHERE bs.user_id = ? AND b.status = 'PUBLISHED'
    ORDER BY bs.created_at DESC
    LIMIT ? OFFSET ?
  `, [userId, limit, offset]);
}

export async function countUserBookmarks(userId) {
  const result = await query(`
    SELECT COUNT(*) as total
    FROM blog_saves
    WHERE user_id = ?
  `, [userId]);
  return result[0].total;
}

// =============================================
// FOLLOW QUERIES
// =============================================

export async function getUserFollowing(userId, limit = 20, offset = 0) {
  return await query(`
    SELECT 
      a.id,
      a.name,
      a.slug,
      a.avatar_url,
      a.author_title,
      a.is_verified,
      a.total_posts,
      af.created_at as followed_at
    FROM author_followers af
    JOIN admin_users a ON af.author_id = a.id
    WHERE af.follower_id = ? AND a.status = 'ACTIVE'
    ORDER BY af.created_at DESC
    LIMIT ? OFFSET ?
  `, [userId, limit, offset]);
}

export async function getUserFollowers(authorId, limit = 20, offset = 0) {
  return await query(`
    SELECT 
      u.id,
      u.name,
      u.username,
      u.avatar_url,
      af.created_at as followed_at
    FROM author_followers af
    JOIN public_users u ON af.follower_id = u.id
    WHERE af.author_id = ? AND u.status = 'ACTIVE'
    ORDER BY af.created_at DESC
    LIMIT ? OFFSET ?
  `, [authorId, limit, offset]);
}

// =============================================
// REPORT QUERIES (Admin)
// =============================================

export async function getPendingReports(limit = 50, offset = 0) {
  return await query(`
    SELECT 
      cr.*,
      u.name as reporter_name,
      u.email as reporter_email,
      CASE 
        WHEN cr.content_type = 'BLOG' THEN b.title
        WHEN cr.content_type = 'COMMENT' THEN c.content
      END as content_preview
    FROM content_reports cr
    LEFT JOIN public_users u ON cr.reporter_id = u.id
    LEFT JOIN blogs b ON cr.content_type = 'BLOG' AND cr.content_id = b.id
    LEFT JOIN comments c ON cr.content_type = 'COMMENT' AND cr.content_id = c.id
    WHERE cr.status = 'PENDING'
    ORDER BY cr.created_at ASC
    LIMIT ? OFFSET ?
  `, [limit, offset]);
}

export async function resolveReport(reportId, adminId, status, notes) {
  return await query(`
    UPDATE content_reports
    SET status = ?, reviewed_by = ?, review_notes = ?, reviewed_at = NOW()
    WHERE id = ?
  `, [status, adminId, notes, reportId]);
}
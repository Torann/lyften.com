---
title: Comment Plugins API
template: documentation.twig::content_inner
chapter: 8
---
### function display(:id, :title)
Return entry comments.

**Attributes:**
* :id[int] - Blog entry ID (required)
* :title[string] - Blog entry title

**Returns:**
String

---

### getCount(:id)
Returns entry comment count.

**Attributes:**
* :id[int] - Blog entry ID (required)

**Returns:**
Array(total, approved, moderated, spam)

---

### getComments(:args)
Returns entry comments for XML-RPC.

**Attributes:**
*  :args[array] - Array values: status, post_id, offset, number

**Returns:**
XML-RPC

---

### getComment(:id)
Returns entry comment based on ID.

**Attributes:**
* :id[int] – Comment’s ID (required)

**Returns:**
Array

---

### deleteComment(:id)
Deletes an entry’s comment based on comment ID.

**Attributes:**
* :id[int] – Comment’s ID (required)

**Returns:**
False or Error Message

---

### editComment(:args)
Edits a comment, used in XML-RPC.

**Attributes:**
* :args[array] – Comment values

**Returns:**
False or Error Message

---

### newComment(:args)
Creates a new comment, used in XML-RPC.

**Attributes:**
* :args[array] – Comment values

**Returns:**
False or Error Message


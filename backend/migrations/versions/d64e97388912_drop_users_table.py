"""drop users table

Revision ID: d64e97388912
Revises: d3f3bb888550
Create Date: 2025-08-28 21:07:54.453801

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd64e97388912'
down_revision = 'd3f3bb888550'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('users')


def downgrade():
    pass

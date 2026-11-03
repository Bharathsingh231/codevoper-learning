// ============================================
// CODEVOPER LEARNING — Pre Primary Dashboard Scripts
// Interactive Milestone Timeline, Achievements & Cosmic Learning Worlds
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initMilestoneBar();
  initAchievementInteractions();
  initAchievementModal();
  initMapHotspots();
});

// ——— 1. Milestone Timeline Progress Bar Animation ———
function initMilestoneBar() {
  const bar = document.querySelector('.milestone-bar-fill');
  if (!bar) return;

  // Start at 0 and animate smoothly to target width (58%)
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = '58%';
  }, 400);
}

// ——— 2. Synchronized Hover Interactions ———
// When hovering an achievement card, illuminate its matching pointer & node
function initAchievementInteractions() {
  const cards = document.querySelectorAll('.achieve-card');
  const nodes = document.querySelectorAll('.milestone-node');

  cards.forEach(card => {
    const index = card.dataset.index;

    card.addEventListener('mouseenter', () => {
      highlightMilestone(index, true);
    });

    card.addEventListener('mouseleave', () => {
      highlightMilestone(index, false);
    });
  });

  nodes.forEach(node => {
    const index = node.dataset.index;

    node.addEventListener('mouseenter', () => {
      highlightMilestone(index, true);
      const card = document.querySelector(`.achieve-card[data-index="${index}"]`);
      if (card) {
        card.style.transform = 'translateY(-6px)';
        card.style.borderColor = '#A78BFA';
      }
    });

    node.addEventListener('mouseleave', () => {
      highlightMilestone(index, false);
      const card = document.querySelector(`.achieve-card[data-index="${index}"]`);
      if (card) {
        card.style.transform = '';
        card.style.borderColor = '';
      }
    });
  });

  function highlightMilestone(idx, isActive) {
    const ptr = document.querySelector(`.milestone-ptr[data-index="${idx}"]`);
    const node = document.querySelector(`.milestone-node[data-index="${idx}"]`);

    if (ptr) {
      if (isActive) {
        ptr.style.transform = 'translateY(-3px) scale(1.3)';
        const triangle = ptr.querySelector('.ptr-triangle');
        if (triangle) triangle.style.color = '#FCD34D';
      } else {
        ptr.style.transform = '';
        const triangle = ptr.querySelector('.ptr-triangle');
        if (triangle) triangle.style.color = '';
      }
    }

    if (node) {
      if (isActive) {
        node.style.transform = 'scale(1.4)';
      } else {
        node.style.transform = '';
      }
    }
  }
}

// ——— 3. Interactive Achievement Detail Modal ———
function initAchievementModal() {
  const overlay = document.getElementById('achieveModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalStatus = document.getElementById('modalStatus');
  const modalDesc = document.getElementById('modalDesc');

  if (!overlay) return;

  const achievementDetails = [
    {
      icon: '🌱',
      title: 'First Step',
      status: 'Unlocked ✓',
      isUnlocked: true,
      desc: 'Congratulations! You completed your first activity and embarked on your Codevoper Learning adventure.',
      xp: '+20 XP Earned'
    },
    {
      icon: '📖',
      title: 'Story Starter',
      status: 'Unlocked ✓',
      isUnlocked: true,
      desc: 'You explored Story World and practiced English & Hindi letters with 14% completion score.',
      xp: '+30 XP Earned'
    },
    {
      icon: '🔢',
      title: 'Number Ninja',
      status: 'Unlocked ✓',
      isUnlocked: true,
      desc: 'You completed 5 Maths activities! Mastered counting, shape identification, and color patterns.',
      xp: '+35 XP Earned'
    },
    {
      icon: '🏆',
      title: 'World Hopper',
      status: 'In Progress (Next Target)',
      isUnlocked: false,
      isTarget: true,
      desc: 'Visit all 5 learning worlds: Story, Number, Discovery, Senses, and Life. 4 of 5 visited so far! Try 1 more activity in Life World to unlock.',
      xp: 'Reward: +50 XP'
    },
    {
      icon: '⭐',
      title: 'Super Star',
      status: 'Locked',
      isUnlocked: false,
      desc: 'Master 25 activities with 80%+ score. You currently have 16 activities mastered. 9 more to unlock!',
      xp: 'Reward: +75 XP'
    },
    {
      icon: '🚀',
      title: 'Rocket Learner',
      status: 'Locked',
      isUnlocked: false,
      desc: 'Reach 50% overall completion across all Pre Primary worlds. Keep learning every day to unlock!',
      xp: 'Reward: +100 XP'
    }
  ];

  // Open modal on card click
  document.querySelectorAll('.achieve-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index) || 0;
      const data = achievementDetails[index];
      if (!data) return;

      modalIcon.textContent = data.icon;
      modalTitle.textContent = data.title;
      modalStatus.textContent = data.status;
      modalDesc.textContent = data.desc;

      const xpEl = overlay.querySelector('.modal-xp-pill');
      if (xpEl) xpEl.textContent = `⭐ ${data.xp}`;

      if (data.isUnlocked) {
        modalStatus.className = 'modal-status';
        modalStatus.style.background = 'rgba(16, 185, 129, 0.15)';
        modalStatus.style.color = '#34D399';
        modalStatus.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      } else if (data.isTarget) {
        modalStatus.className = 'modal-status';
        modalStatus.style.background = 'rgba(245, 158, 11, 0.18)';
        modalStatus.style.color = '#FCD34D';
        modalStatus.style.borderColor = 'rgba(245, 158, 11, 0.5)';
      } else {
        modalStatus.className = 'modal-status locked';
        modalStatus.style.background = 'rgba(255, 255, 255, 0.08)';
        modalStatus.style.color = '#94A3B8';
        modalStatus.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      }

      overlay.classList.add('open');
    });

    // Enter key accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
    }
  });
}

// ——— 4. Interactive Learning Map Hotspot Touch/Hover Support ———
function initMapHotspots() {
  const hotspots = document.querySelectorAll('.map-hotspot');

  hotspots.forEach(hotspot => {
    // Touch device support: tap once to view popover preview, tap again/link to navigate
    hotspot.addEventListener('touchstart', (e) => {
      const isAlreadyActive = hotspot.classList.contains('active-touch');
      hotspots.forEach(h => h.classList.remove('active-touch'));
      if (!isAlreadyActive) {
        hotspot.classList.add('active-touch');
      }
    }, { passive: true });
  });

  // Close touch popovers when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.map-hotspot')) {
      hotspots.forEach(h => h.classList.remove('active-touch'));
    }
  });
}

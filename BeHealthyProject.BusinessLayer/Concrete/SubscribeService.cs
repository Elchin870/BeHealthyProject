using BeHealthyProject.BusinessLayer.Abstract;
using BeHealthyProject.Entities;
using BeHealthyProject.Server.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class SubscribeService : ISubscribeService
{
	private readonly BeHealthyDbContext _dbContext;
	private readonly UserManager<BaseUser> _userManager;

	public SubscribeService(BeHealthyDbContext dbContext, UserManager<BaseUser> userManager)
	{
		_dbContext = dbContext;
		_userManager = userManager;
	}

	public async Task<List<string>> GetSubscribedDietitians(string userId)
	{
		var userBaseUser = await _userManager.FindByIdAsync(userId);
		var user = userBaseUser as User;
		if (user == null)
		{
			throw new Exception("User not found!");
		}

		var subscribedDietitians = _dbContext.Subscribers
			.Where(sub => sub.Subscribers.Contains(user))
			.Select(sub => sub.Dietitian.Id)
			.ToList();

		return subscribedDietitians;
	}
	public async Task<List<User>> GetSubscribers(string id)
	{
		var subscribe = await _dbContext.Subscribers.FirstOrDefaultAsync(x => x.Dietitian.Id == id);
		var subscribers =  subscribe.Subscribers.ToList();
		return subscribers;
	}

	public Task<List<User>> GetSubscribers()
	{
		throw new NotImplementedException();
	}

	public async Task<Subscriber> Subscribe(string dietitianId, string userId)
	{
		var dietitianBaseUser = await _userManager.FindByIdAsync(dietitianId);
		var dietitian = dietitianBaseUser as Dietitian;
		var userBaseUser = await _userManager.FindByIdAsync(userId);
		var user = userBaseUser as User;

		if (dietitian == null || user == null)
		{
			throw new Exception("Either the Dietitian or the User not found!");
		}

		var dietitianSubs = await _dbContext.Subscribers.FirstOrDefaultAsync(x => x.Dietitian == dietitian);

		if (dietitianSubs != null)
		{
			if (dietitianSubs.Subscribers.Contains(user))
			{
				throw new Exception("User is already subscribed to this dietitian.");
			}
			dietitianSubs.Subscribers.Add(user);
		}
		else
		{
			var newSubscriber = new Subscriber
			{
				Dietitian = dietitian,
				Subscribers = new List<User> { user }
			};
			await _dbContext.Subscribers.AddAsync(newSubscriber);
			dietitianSubs = newSubscriber;
		}

		await _dbContext.SaveChangesAsync();

		return dietitianSubs;
	}

	public async Task<Subscriber> Unsubscribe(string dietitianId, string userId)
	{
		var dietitianBaseUser = await _userManager.FindByIdAsync(dietitianId);
		var dietitian = dietitianBaseUser as Dietitian;
		var dietitianSubs = await _dbContext.Subscribers.FirstOrDefaultAsync(d => d.Dietitian == dietitian);
		var userBaseUser = await _userManager.FindByIdAsync(userId);
		var user = userBaseUser as User;

		if (dietitian == null || user == null)
		{
			throw new Exception("Either the Dietitian or the User not found!");
		}

		if (dietitianSubs == null)
		{
			throw new Exception("Dietitian has no subscribers.");
		}

		if (!dietitianSubs.Subscribers.Contains(user))
		{
			throw new Exception("User is not subscribed to this dietitian.");
		}

		dietitianSubs.Subscribers.Remove(user);

		await _dbContext.SaveChangesAsync();

		return dietitianSubs;
	}
}
